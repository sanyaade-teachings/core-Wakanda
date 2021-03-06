/*
* This file is part of Wakanda software, licensed by 4D under
*  (i) the GNU General Public License version 3 (GNU GPL v3), or
*  (ii) the Affero General Public License version 3 (AGPL v3) or
*  (iii) a commercial license.
* This file remains the exclusive property of 4D and/or its licensors
* and is protected by national and international legislations.
* In any event, Licensee's compliance with the terms and conditions
* of the applicable license constitutes a prerequisite to any use of this file.
* Except as otherwise expressly stated in the applicable license,
* such license does not include any other license or rights on this file,
* 4D's and/or its licensors' trademarks and/or other proprietary rights.
* Consequently, no title, copyright or other proprietary rights
* other than those specified in the applicable license is granted.
*/
// Entry checking function. Check all attributes and methods are there.

var checkEntry = function (entry) {
	
	Y.Assert.isBoolean(entry.isFile);	
	Y.Assert.isBoolean(entry.isDirectory);	
	Y.Assert.isTrue(entry.isFile == !entry.isDirectory);

	Y.Assert.isString(entry.name);
	Y.Assert.isString(entry.fullPath);
	Y.Assert.isTrue(entry.name.length <= entry.fullPath.length);
		
	Y.Assert.isObject(entry.filesystem);
	
	if (entry.isFile) {
		
		// File entry.
	
		var	index, name;
		
		index = entry.fullPath.length - entry.name.length;
		name = entry.fullPath.substr(index);
		
		Y.Assert.areEqual(name, entry.name);
		
	} else if (entry.name == '') {
	
		// Entry is root directory.
		
		Y.Assert.areEqual('/', entry.fullPath);
		
		// Root entry is unique.
		
		Y.Assert.areEqual(entry, entry.filesystem.root);
		
	} else {
			
		// Directory entry.
			
		var	index, name;
				
		index = entry.fullPath.length - entry.name.length - 1;
		name = entry.fullPath.substr(index, entry.name.length);
			
		Y.Assert.areEqual(name, entry.name);
		
	}      
	
	Y.Assert.isObject(entry.getMetadata);
    Y.Assert.isObject(entry.moveTo);
    Y.Assert.isObject(entry.copyTo);
    Y.Assert.isObject(entry.toURL);
    Y.Assert.isObject(entry.remove);
    Y.Assert.isObject(entry.getParent);

	if (entry.isFile) {
		
		Y.Assert.isObject(entry.createWriter);
		Y.Assert.isObject(entry.file);
		
	} else {
		
		Y.Assert.isObject(entry.createReader);		    
    	Y.Assert.isObject(entry.getFile);
    	Y.Assert.isObject(entry.getDirectory);
    	Y.Assert.isObject(entry.removeRecursively);
		
	}
	
}

// Generate a random string of asked length containing upper and lower case letters.

var randomString = function (length) 
{
	var	i, string;
		
	for (i = 0, string = ""; i < length; i++) {
	
		var	charCode;
		
		charCode = (Math.random() >= 0.5 ? 65 : 97) + Math.round(Math.random() * 25);
		string = string.concat(String.fromCharCode(charCode));
	
	}
	
	return string;
}

// Generate an associate array of random strings of at most 9 characters.

var generateNameList = function (size) {
		
	var array, string;
	
	array = new Array()
	while (size > 0) {
	
		string = randomString(Math.round(1 + Math.random() * 9))
		if (array[string] != true) {
	
			array[string] = true;
			size--;
		
		}
		
	}
	
	return array;
}

// Read content of folder and return an array of entries.

var readDirectory = function (folder) 
{
	Y.Assert.isTrue(folder.isDirectory && !folder.isFile);
	
	var	exception, reader, array;
	
	exception = null;
	try {
		
		reader = folder.createReader();
		
	} catch (e) {
		
		exception = e;
		
	}
	Y.Assert.isNull(exception);
	
	array = new Array();
	
	for ( ; ; ) {
		
		var entries;
		
		try {
			
			entries = reader.readEntries();			
			
		} catch (e) {
			
			exception = e;
			
		}
		Y.Assert.isNull(exception);
		if (entries.length == 0)
		
			break;
			
		else
		
			array = array.concat(entries);

	} 	
	
	return array;
}

// Find out all names of an entries array and make an associative array.
// This will check all entries.

var extractNamesFromEntriesList = function (entries) 
{
	var	i, array;
	
	array = new Array();
	for (i = 0; i < entries.length; i++) {
	
		checkEntry(entries[i]);	
		
		Y.Assert.areNotEqual(true, array[entries[i].name]);
		array[entries[i].name] = true;
		
	}
	
	return array;
}

// Check file creation in given folder. This will check file(), 
// getFile(), getMetadata(), and remove() functions.

var fileCreationAndDeletionTestSync = function (folder) 
{	
	var	exception = null;
	
	// Check file doesn't exist. Note that before testing start, "toto.txt" must 
	// not exist on disk.

	try {
		
		folder.getFile("toto.txt");
				
	} catch (e) {
	
		exception = e;
		
	}			
	Y.Assert.isNotNull(exception, 'An exception should have been thrown: "toto.txt" should not exist (1)');		
	Y.Assert.areEqual(exception.NOT_FOUND_ERR, exception.code);
	exception = null;
			
	var	entry;
	
	// Try creating file.
		
	try {
					
		entry = folder.getFile("toto.txt", { create: true });		
									
	} catch (e) {
		
		exception = e;
						
	}
	Y.Assert.isNull(exception);
	checkEntry(entry);
		
	// Check file has been created.
		
	try {
				
		entry = folder.getFile("toto.txt");
				
	} catch (e) {
	
		exception = e;
		
	}			
	Y.Assert.isNull(exception);
	checkEntry(entry);
	Y.Assert.areEqual(0, entry.file().size); 
		
	// Fill with garbage.
		
	var textStream;
	
	textStream = new TextStream(entry.file(), "Write");
	textStream.write("Hello world!\n");
	textStream.flush();
	textStream.close();
	Y.Assert.isTrue(entry.file().size > 0); 	
		
	// Check file deletion.
	
	try {
				
		entry.remove();
				
	} catch (e) {
	
		exception = e;
		
	}			
	Y.Assert.isNull(exception);
	
	// Check file has been deleted indeed.

	try {
		
		folder.getFile("toto.txt");
				
	} catch (e) {
	
		exception = e;
		
	}
	Y.Assert.isNotNull(exception, 'An exception should have been thrown: "toto.txt" should not exist (2)');		
	Y.Assert.areEqual(exception.NOT_FOUND_ERR, exception.code);
}

// Create folders along with files, then check copy and deletion.

var folderCreationCopyAndDeletionTestSync = function (rootFolder) 
{
	var	exception = null;
	
	// Check folder doesn't exist. For test to succeed, testing must start
	// after ensuring folder is not on disk. 

	try {
		
		rootFolder.getDirectory("/testdir/");
				
	} catch (e) {
	
		exception = e;
		
	}	
	Y.Assert.isNotNull(exception, 'An exception should have been thrown: "/testdir/" should not exist (1)');
	Y.Assert.areEqual(exception.NOT_FOUND_ERR, exception.code);

	exception = null;
		
	// Try creating folder. Note path given as relative.
	
	var folder;
		
	try {
					
		folder = rootFolder.getDirectory("testdir", { create: true });		
									
	} catch (e) {
		
		exception = e;
						
	}
	Y.Assert.isNull(exception);
	checkEntry(folder);
			
	// Populate folder, along with a subfolder.
	
	var folderFilesList, subFolderFilesList;
	
	folderFilesList = generateNameList(15);
	subFolderFilesList = generateNameList(10);
	
	var	k;
	
	for (k in folderFilesList) {
		
		var	entry;
		
		try {
			
			entry = folder.getFile(k, { create: true });			
			
		} catch (e) {
			
			exception = e;
			
		}		
		Y.Assert.isNull(exception);
		checkEntry(entry);
		
	}

	// Check files have been correctly created.

	var	entries, names;
	
	entries = readDirectory(folder);		
	names = extractNamesFromEntriesList(entries);
	for (k in folderFilesList)
	
		if (names[k] != true) 
		
			Y.Assert.fail('File not found in "testdir" directory!');
			
	// Create subfolder along with files.
			
	var subFolder;
	
	try {
			
		subFolder = folder.getDirectory("subFolder", { create: true });
			
	} catch (e) {
			
		exception = e;
			
	}	
	Y.Assert.isNull(exception);
	checkEntry(subFolder);
	
	for (k in subFolderFilesList) {
	
		var	entry;
		
		try {
			
			entry = subFolder.getFile(k, { create: true });			
			
		} catch (e) {
			
			exception = e;
			
		}		
		Y.Assert.isNull(exception);
		checkEntry(entry);
		
	}	
	
	entries = readDirectory(subFolder);
	names = extractNamesFromEntriesList(entries);
	for (k in subFolderFilesList)
	
		if (names[k] != true) 
		
			Y.Assert.fail('File not found in "subFolder" directory!');
			
	// Try to make a copy of subFolder.
	
	var copyFolder;
		
	try {
			
		copyFolder = subFolder.copyTo(subFolder.getParent(), "copy");
			
	} catch (e) {
		
		exception = e;
			
	}		
	Y.Assert.isNull(exception);
	// checkEntry(copyFolder);
	copyFolder = folder.getDirectory("copy");
	
	// Check copy has succeeded.

	entries = readDirectory(copyFolder);
	names = extractNamesFromEntriesList(entries);
	for (k in subFolderFilesList)
	
		if (names[k] != true) 
		
			Y.Assert.fail('File not found in "copy" directory!');

	// Check deletion.
	
	try {
			
		copyFolder.removeRecursively();
			
	} catch (e) {
		
		exception = e;
			
	}		
	Y.Assert.isNull(exception);
	
	try {
			
		folder.removeRecursively();
			
	} catch (e) {
		
		exception = e;
			
	}		
	Y.Assert.isNull(exception);
	
};

var testCase = {

    name: "W3C File System Test",

    _should: {

        ignore: {

        }

    },
    
    // Check if W3C File System API is present.
    
    testIsAvailable: function () {

	    Y.Assert.isNumber(TEMPORARY);
		Y.Assert.areEqual(TEMPORARY, 0);
		Y.Assert.isNumber(PERSISTENT);
		Y.Assert.areEqual(PERSISTENT, 1);
		
		Y.Assert.isObject(requestFileSystem);
		Y.Assert.isObject(resolveLocalFileSystemURL);
		
        Y.Assert.isObject(requestFileSystemSync);
		Y.Assert.isObject(resolveLocalFileSystemSyncURL);
	
    },

	// Basic persistent file system request.
    
    testBasicRequestPersistentSync: function () {
    	
    	var	fileSystem;
    	
    	fileSystem = requestFileSystemSync(PERSISTENT, 0);
    	Y.Assert.isString(fileSystem.name);
    	Y.Assert.isObject(fileSystem.root);
    					    	
    	checkEntry(fileSystem.root);
		
		// FileSystemSync objects are unique.
		
		Y.Assert.areEqual(fileSystem, fileSystem.root.filesystem);
    	
    },
    	
	
	// Basic temporary file system request.

    testRequestTemporarySync: function () {
    	
    	var	fileSystem;
    	
    	fileSystem = requestFileSystemSync(TEMPORARY, 0);
    	Y.Assert.isString(fileSystem.name);
    	Y.Assert.isObject(fileSystem.root);
    	
    	checkEntry(fileSystem.root);
		
		// FileSystemSync objects are unique.
		
		Y.Assert.areEqual(fileSystem, fileSystem.root.filesystem);
      	
    },

	// Basic resolve URL.

    testBasicResolveSync: function () {
    	
    	var	entry1, entry2;
    	
    	entry1 = resolveLocalFileSystemSyncURL("/testfile1.txt");
		checkEntry(entry1);

    	entry2 = resolveLocalFileSystemSyncURL("testfile2.txt");
		checkEntry(entry2);
		
		// Entries are in the same relative file system.
		
		Y.Assert.areEqual(entry1.filesystem, entry2.filesystem);
		
	},

	testFileCreationDeletionTemporaryFileSystemSync: function () {
		
		var	root;
		
		root = requestFileSystemSync(TEMPORARY, 0).root;
		fileCreationAndDeletionTestSync(root);
		
	},
	
	testFileCreationDeletionPersistentFileSystemSync: function () {
		
		var	root;
		
		root = requestFileSystemSync(PERSISTENT, 0).root;
		fileCreationAndDeletionTestSync(root);
		
	},
	
	testFileCreationDeletionRelativeFileSystemSync: function () {
		
		var	root;
		
		root = resolveLocalFileSystemSyncURL("/");
		fileCreationAndDeletionTestSync(root);
		
	},

	testReadingRelativeRootFileSystemSync: function () {
		
		var	root, entries, names;
		
		root = resolveLocalFileSystemSyncURL("/");
		entries = readDirectory(root);		
		names = extractNamesFromEntriesList(entries);
		Y.Assert.isTrue(names["testfile1.txt"]);
		Y.Assert.isTrue(names["testfile2.txt"]);
		
	},

	testFolderCreationDeletionTemporaryFileSystemSync: function () {

		var	root;
		
		root = requestFileSystemSync(TEMPORARY, 0).root;
		folderCreationCopyAndDeletionTestSync(root);
	
	},
	
	testFolderCreationDeletionPersistentFileSystemSync: function () {

		var	root;
		
		root = requestFileSystemSync(PERSISTENT, 0).root;
		folderCreationCopyAndDeletionTestSync(root);
	
	},
		
	testFolderCreationDeletionRelativeFileSystemSync: function () {

		var	root;
		
		root = resolveLocalFileSystemSyncURL("/");
		folderCreationCopyAndDeletionTestSync(root);
	
	}

};

// require("unitTest").run(testCase).getReport();