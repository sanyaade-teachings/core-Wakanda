/**
 * 
 */
package org.wakanda.qa.server.utils;

import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;

import org.apache.commons.io.FileUtils;
import org.apache.http.HttpRequest;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;

import com.google.gson.Gson;

/**
 * @author ouissam.gouni@4d.com Provides classes and methods that handle wakanda
 *         rest request/response
 * 
 */
public class JsonUtil {

	//private static Logger logger = Logger.getLogger(JsonUtil.class);

	/**
	 * Returns the rest request that gets all dataclass entities.
	 * 
	 * @param dataClass
	 * @return
	 */
	public static HttpRequest getRestRequestForRead(String dataClass) {
		String dataClassUrl = "/rest/" + dataClass;
		String url = dataClassUrl + "/";
		HttpRequest request = new HttpGet(url);
		return request;
	}

	/**
	 * Returns the rest request that updates or add an entity to the given
	 * dataclass.
	 * 
	 * @param dataClass
	 * @param target
	 * @param entity
	 * @return
	 */
	public static HttpRequest getRestRequestForUpdate(String dataClass, JsonEntity entity) {
		String dataClassUrl = "/rest/" + dataClass;
		String url = dataClassUrl + "/?$method=update";
		HttpRequest request = new HttpPost(url);
		JsonEntity[] recordsToSend = new JsonEntity[] { entity };
		StringEntity reqEntity;
		try {
			reqEntity = new StringEntity(new Gson().toJson(new JsonResquest(
					recordsToSend)));
			((HttpPost) request).setEntity(reqEntity);
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
			return null;
		}
		return request;

	}
	
	public static HttpRequest getRestRequestForDelete(String dataClass, JsonEntity entity) {
		String dataClassUrl = "/rest/" + dataClass;
		String url = dataClassUrl + "(" + entity.getKey()
				+ ")/?$method=delete";
		HttpRequest request = new HttpGet(url);
		return request;
	}
	
	public static HttpRequest getRestRequestForDataClassMethod(String dataClass,
			String method) {
		String url = "/rest/" + dataClass + "/" + method;
		HttpGet request = new HttpGet(url);
		return request;
	}
	
	public static JsonModel getModel(File modelFile) throws IOException{
		JsonModel omodel = null;
		String jmodel = FileUtils.readFileToString(modelFile);
		omodel= new Gson().fromJson(jmodel, JsonModel.class);
		return omodel;
	}

	public static class JsonResponse {

		private String __entityModel;
		private String __COUNT;
		private String __SENT;
		private String __FIRST;
		private JsonEntity[] __ENTITIES;

		public String getEntityModel() {
			return __entityModel;
		}

		public String getCount() {
			return __COUNT;
		}

		public String getSent() {
			return __SENT;
		}

		public String getFirst() {
			return __FIRST;
		}

		public JsonEntity[] getEntities() {
			return __ENTITIES;
		}
	}

	public static class JsonResquest {
		private JsonEntity[] __ENTITIES;

		public JsonResquest(JsonEntity[] __ENTITIES) {
			super();
			this.__ENTITIES = __ENTITIES;
		}

		public JsonEntity[] getEntities() {
			return __ENTITIES;
		}
	}

	public static class JsonEntity {

		private String __KEY;
		private String __STAMP;
		private String ID;
		private String name;

		public JsonEntity(String __KEY, String __STAMP, String ID, String name) {
			this.__KEY = __KEY;
			this.__STAMP = __STAMP;
			this.ID = ID;
			this.name = name;
		}

		public JsonEntity(String ID, String name) {
			this.__KEY = null;
			this.__STAMP = null;
			this.ID = ID;
			this.name = name;
		}

		public JsonEntity(String name) {
			this.__KEY = null;
			this.__STAMP = null;
			this.ID = null;
			this.name = name;
		}

		public String getKey() {
			return __KEY;
		}

		public String getStamp() {
			return __STAMP;
		}

		public String getID() {
			return ID;
		}

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}

	}

	public static class JsonErrors {
		private JsonError[] __ERROR;

		public JsonError[] getErrors() {
			return __ERROR;
		}
		
		public static class JsonError {
			private String message;
			private String componentSignature;
			private int errCode;

			public String getMessage() {
				return message;
			}

			public String getComponentSignature() {
				return componentSignature;
			}

			public int getErrCode() {
				return errCode;
			}
		}
	}
	

	public static class JsonResult {
		private String result;

		public String getResult() {
			return result;
		}
	}
	
	public static class JsonModel{
		
		private boolean toJSON;
		private DataClass[] dataClasses;
		
		public boolean isToJSON() {
			return toJSON;
		}
		
		public DataClass[] getDataClasses() {
			return dataClasses;
		}
		
		public static class Attribute{
			
			private String name;
            private String kind;
            private String scope;
            private boolean unique;
            private boolean autosequence;
            private String type;
            private boolean primKey;
            
			public String getName() {
				return name;
			}
			public String getKind() {
				return kind;
			}
			public boolean isUnique() {
				return unique;
			}
			public String getScope() {
				return scope;
			}
			public boolean isAutosequence() {
				return autosequence;
			}
			public String getType() {
				return type;
			}
			public boolean isPrimKey() {
				return primKey;
			}
		}
		
		public static class Method{
			
			private String name;
            private String applyTo;
            private String scope;
            private String from;
            
			public String getName() {
				return name;
			}
			public String getApplyTo() {
				return applyTo;
			}
			public String getScope() {
				return scope;
			}
			public String getFrom() {
				return from;
			}
		}
		
		public static class DataClass{
			
			private String name;
	        private String className;
	        private String collectionName;
	        private String scope;
			private Attribute[] attributes;
			private Method[] methods;
			
			public Attribute[] getAttributes() {
				return attributes;
			}
			public Method[] getMethods() {
				return methods;
			}
			public String getName() {
				return name;
			}
			public String getClassName() {
				return className;
			}
			public String getCollectionName() {
				return collectionName;
			}
			public String getScope() {
				return scope;
			}
		}
		
	}

}
