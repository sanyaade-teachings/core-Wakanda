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



/**
 * Performe a structural check of the objects contained in the Datastore of project projectName
 * @param {String} solutionPath
 * @param {String} projectName
 */
Admin.prototype.verifyApplication  =  function verifyApplication(solutionPath, projectName){
   
    var option = {
        solutionPath: solutionPath,
        applicationName: projectName
    };
		
    // disable interface and start listening for progress
    adminObject.maintenanceStart();

    adminObject.showMessage('info', adminObject.resources.VERIFY_INFO_MSG);
    
    
    webAdmin.verifyApplicationAsync({
        "onSuccess": function(response) {
            adminObject.maintenanceEnd();

            if(verifyLogs[0].date == "Never"){
                verifyLogs.shift();
            }
                
            verifyLogs.push(response.file);
            sources.verifyLogs.sync();
            sources.verifyLogs.orderBy('date desc');
                
            adminObject.console.getMaintenanceLog();
            adminObject.showMessage('success', adminObject.resources.VERIFY_SUCC_MSG);
        },
        "onerror": function(response) {
            adminObject.maintenanceEnd();
            adminObject.showMessage('error', adminObject.resources.VERIFY_ERR_MSG);
            console.log(response);
        }
    }, option);
};



/**
 * Start the backup of the current datastore of projectName
 * @param {String} solutionPath
 * @param {String} projectName
 */
Admin.prototype.backupApplication  =   function backupApplication(solutionPath, projectName){
    
    var option = {
        solutionPath: solutionPath,
        applicationName: projectName
    };

    // disable interface and start listening for progress
    adminObject.maintenanceStart();
    
    adminObject.showMessage('info', adminObject.resources.BACKUP_INFO_MSG);
    webAdmin.backupApplicationAsync({
        "onSuccess": function(response) {
            adminObject.maintenanceEnd();
                
            if(backupLogs[0].date == "Never"){
                backupLogs.shift();
            }
            adminObject.console.getMaintenanceLog();
            backupLogs.push(response.file);
            sources.backupLogs.sync();
            sources.backupLogs.orderBy('date desc');
            adminObject.console.getMaintenanceLog();
            adminObject.showMessage('success', adminObject.resources.BACKUP_SUCC_MSG);
        },
        "onerror": function(response) {
            adminObject.maintenanceEnd();
            adminObject.showMessage('error', adminObject.resources.BACKUP_ERR_MSG);
            console.log(response);
        }
    }, option);
};



/**
 * Compacts the datastore's data file designated by model and data, and generates the compactedData data file
 * @param {String} solutionPath
 * @param {String} projectName
 */
Admin.prototype.compactApplication = function compactApplication(solutionPath, projectName) {
        
    if (sources.solutions.isRunning) {
        if (confirm(adminObject.resources.CONFIRM_MSG) ) {
            localStorage.callback = "compact";
            localStorage.solutionPath  = solutionPath;
            localStorage.projectName = projectName;
            adminObject.stopSolution();
        }
    } else {
        
        var option = {
            solutionPath: solutionPath,
            applicationName: projectName
        };
        try {
            // disable interface and start listening for progress
            adminObject.maintenanceStart();
            
            adminObject.showMessage('info', 'Compacting started');
            
            webAdmin.compactApplicationAsync({
                "onSuccess": function(response) {
                    
                    adminObject.maintenanceEnd();                    
                    if(compactLogs[0].date == "Never"){
                        compactLogs.shift();
                    }
                    compactLogs.push(response.file);
                    sources.compactLogs.sync();
                    sources.compactLogs.orderBy('date desc');
                    
                    
                    adminObject.console.getMaintenanceLog();
                    adminObject.showMessage('success', adminObject.resources.COMPACT_SUCC_MSG);
                        
                },
                "onerror": function(response) {                    
                    adminObject.maintenanceEnd();
                    adminObject.showMessage('error', adminObject.resources.COMPACT_ERR_MSG);
                    console.log(response);
                }
            }, option);
        } catch (e) {
            console.log(e);
        }
    }
};



/**
 * @TODO
 * @param {String} solutionPath
 * @param {String} projectName
 */
Admin.prototype.repairApplication = function repairApplication(solutionPath, projectName) {
       
        
    if (sources.solutions.isRunning) {
        if (confirm(adminObject.resources.CONFIRM_MSG) ) {
            localStorage.callback = "repair";
            localStorage.solutionPath  = solutionPath;
            localStorage.projectName = projectName;
            adminObject.stopSolution();            
        }
    } else {
        try {
            var option = {
                solutionPath: solutionPath,
                applicationName: projectName
            };
            // disable interface and start listening for progress
            adminObject.maintenanceStart();
            
            adminObject.showMessage('info', adminObject.resources.REPAIR_INFO_MSG);
            
            webAdmin.repairApplicationAsync({
                "onSuccess": function(response) {
                    
                    adminObject.maintenanceEnd();                    
                    if(repairLogs[0].date == "Never"){
                        repairLogs.shift();
                    }
                    repairLogs.push(response.file);
                    sources.repairLogs.sync();
                    sources.repairLogs.orderBy('date desc');
                    
                    adminObject.console.getMaintenanceLog();
                    adminObject.showMessage('success', adminObject.resources.REPAIR_SUCC_MSG);
                        
                },
                "onerror": function(response) {                    
                    adminObject.maintenanceEnd();
                    adminObject.showMessage('error', adminObject.resources.REPAIR_ERR_MSG);
                    console.log(response);
                }
            }, option);
        } catch (e) {
            console.log(e);
        }
    }
};



/**
 * @TODO
 * @param {String} solutionPath
 * @param {String} projectName
 * @param {String} restoreDate
 */
Admin.prototype.restoreApplication = function restoreApplication(solutionPath, projectName, restoreDate) {       
   
    if (sources.solutions.isRunning) {
        if (confirm(adminObject.resources.CONFIRM_MSG)) {
            localStorage.callback = "restore";
            localStorage.solutionPath  = solutionPath;
            localStorage.projectName = projectName
            localStorage.restoreDate = restoreDate;
            adminObject.stopSolution();
        }
    } else {
        
        var option = {
            restoreDate     : restoreDate, 
            solutionPath    : solutionPath,
            applicationName : projectName
        };
        
        try {
            // disable interface and start listening for progress
            adminObject.maintenanceStart();
            
            adminObject.showMessage('info', adminObject.resources.RESTORE_INFO_MSG);
            
            webAdmin.restoreApplicationAsync({
                "onSuccess": function(response) {
                    adminObject.maintenanceEnd();
                    
                    adminObject.console.getMaintenanceLog();
                    adminObject.showMessage('success', adminObject.resources.RESTORE_SUCC_MSG);                    
                },
                "onerror": function(response) {
                    adminObject.maintenanceEnd();
                    adminObject.showMessage('error', adminObject.resources.RESTORE_ERR_MSG);
                    console.log(response);
                }
            }, option);
        } catch (e) {
            console.log(e);
        }
    }
};



/**
 * @TODO
 * @param {Object} app
 */
Admin.prototype.openDebugger = function openDebugger(app) {
    var url;

    if (app.http && app.http.ip) {
        url = "https://" + window.location.hostname + ":4433/walib/debugger/remote_debugger.html";
        window.open(url, '_blank');
    }
};



/**
 * @TODO
 * @param {Object} app
 */
Admin.prototype.openDataBrowser = function openDataBrowser(app) {
    var url;

    if (app.http && app.http.ip) {
        url = "http://" + app.http.ip + ":" + app.http.port + "/walib/dataBrowser/index.html";
        window.open(url, '_blank');
    }
};



/**
 * @TODO
 */
Admin.prototype.stopSolution = function stopSolution() {

    adminObject.disableInterface();
    adminObject.showMessage('info', adminObject.resources.STOP_SOLUTION_MSG);
    webAdmin.closeSolutionAsync({
        "onSuccess": function() {
            adminObject.reloadingSetTimeOut.push(setTimeout(adminObject.waitServerAndCallback, 9000, function() {
                window.location.reload();
            }));

        },
        "onerror": function(response) {
            console.log(response);
        } 
    }, sources.solutions.path);
};
   
   
   
/**
 * @TODO
 */
Admin.prototype.startSolution = function startSolution() {

    if(sources.solutions.name == null){
        adminObject.showMessage('info', adminObject.resources.START_SOLUTION_INFO_MSG);
        return;
    } 
        
    adminObject.showMessage('info', adminObject.resources.START_SOLUTION_MSG);


    adminObject.disableInterface();
    webAdmin.openSolutionByPathAsync({
        "onSuccess": function() {
            adminObject.reloadingSetTimeOut.push(setTimeout(adminObject.waitServerAndCallback, 5000, function() {
                window.location.reload();
            }));

        },
        "onerror": function(response) {
            console.log(response);
        }
    }, sources.solutions.path);
};



/**
 * @TODO
 */
Admin.prototype.openSolutionSettings = function openSolutionSettings(){
    $('#container14').hide();
    $('#solutionsSettingsContainer').show();    
    $("#frame1 iframe").attr("src", ""); //@TODO ugly hack
    $("#frame3 iframe").attr("src", "/webComponents/settingsEditor/index.html");
};



/**
 * @TODO
 */
Admin.prototype.openProjectSettings = function openProjectSettings(solutionPath, projectName){		
    studio.editor.getSettingJsonData(solutionPath, projectName);
    $$('verifyButton').disable();
    $$('repairButton').disable();
    $$('backupButton').disable();
    $$('compactButton').disable();
    $$('saveSettings').enable();
    $('#general_info_container').hide();
    $('#settingsContainer').show();
};




/**
 * @TODO
 */
Admin.prototype.saveSolutionSettings = function saveSolutionSettings(solutionPath){
    var settings = {
        fixedSize : $('#frame3-frame').contents().find("#fixedSize").val(),
        authenticationType : $('#frame3-frame').contents().find("#authenticationType").val(),
        flushDataCacheInterval : $('#frame3-frame').contents().find("#flushDataCacheInterval").val()       
    };
    studio.editor.setSettingJsonData(solutionPath, null, settings);
    $('#solutionsSettingsContainer').hide();
    $("#frame3 iframe").attr("src", "");
    $('#container14').show();
};



/**
 * @TODO
 */
Admin.prototype.saveProjectSettings = function openProjectSettings(solutionPath, projectName){
    studio.editor.setSettingJsonData(solutionPath, projectName);
    $("#frame3 iframe").attr("src", "");
    $('#settingsContainer').hide();
    $('#general_info_container').show();
    $$('verifyButton').enable();
    $$('repairButton').enable();
    $$('backupButton').enable();
    $$('compactButton').enable();
    $$('saveSettings').disable();
};



/**
 * @TODO
 */
Admin.prototype.getLogs = function getLogs(path){
    var downloadUrl = "/ReadFile?name=" + path + "&download=true";
    window.open(downloadUrl, "download log");
};

/**
 * @TODO
 */

Admin.prototype.openSolutionByPath = function openSolutionByPath(path){

    var ext = path.substr(path.length-11);
    if( ext === ".waSolution"){
        webAdmin.openSolutionByPathAsync({
        "onSuccess": function(response) {

            var modal = $('#openModal .alert-info');
            modal.append('<p>Please wait while your solution is being loaded. This process may take a few seconds. <span id="timer"><b>10</b>s</span></p>');
            window.setInterval(function(){
                var timer = $("#timer b");
                var oldValue = +($("#timer b").html());
                timer.html(--oldValue);
            },1000);
            adminObject.reloadingSetTimeOut.push(setTimeout(adminObject.waitServerAndCallback, 9000, function() {
                window.location.reload();
            }));
        },
        "onerror": function(response) {
            console.log("error");
        }
        },path);
    }
    
};