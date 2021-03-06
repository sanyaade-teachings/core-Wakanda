package selenium;

import static org.junit.Assert.*;

import org.junit.Ignore;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebElement;

public class TestCasesSplitAPI extends Template {

	public TestCasesSplitAPI(eBrowser browserName,String soluString,boolean launchServerOnlyOneTime) {
		super(browserName, soluString,launchServerOnlyOneTime);
	}

	@Test
	public void testSplit_hide() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/splitViewAPI.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		js.executeScript("$$('splitView1').hide();");
		Thread.sleep(500);
		
		String result = fDriver.findElement(By.id("splitView1")).getCssValue("display");
		assertEquals("Check hide() API", "none", result);
	}
	
	@Test
	public void testSplit_show() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/splitViewAPI.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		js.executeScript("$$('splitView1').hide();" +
				"$$('splitView1').show();");
		Thread.sleep(500);
		
		String result = fDriver.findElement(By.id("splitView1")).getCssValue("display");
		assertEquals("Check show() API", "block", result);
	}
	
	@Test
	public void testSplit_toggle() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/splitViewAPI.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		js.executeScript("$$('splitView1').toggle();");
		Thread.sleep(500);
		
		String result = fDriver.findElement(By.id("splitView1")).getCssValue("display");
		assertEquals("Check toggle() API", "none", result);
	}
	
	@Test
	public void testSplit_toggle_back() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/splitViewAPI.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		js.executeScript("$$('splitView1').toggle();" +
				"$$('splitView1').toggle();");
		Thread.sleep(500);
		
		String result = fDriver.findElement(By.id("splitView1")).getCssValue("display");
		assertEquals("Check toggle() back API", "block", result);
	}
	
	@Test
	public void testSplit_addClass() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/splitViewAPI.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		js.executeScript("$$('splitView1').addClass('toto');");
		Thread.sleep(500);
		
		String result = fDriver.findElement(By.id("splitView1")).getAttribute("className").contains("toto") +"";
		assertEquals("Check addClass() API", "true", result);
	}
	
	@Test
	public void testSplit_removeClass() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/splitViewAPI.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		js.executeScript("$$('splitView1').addClass('toto');" +
				"$$('splitView1').removeClass('toto');");
		Thread.sleep(500);
		
		String result = fDriver.findElement(By.id("splitView1")).getAttribute("className").contains("toto") +"";
		assertEquals("Check removeClass() API", "false", result);
	}
	
	@Test
	public void testSplit_move() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/splitViewAPI.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		js.executeScript("$$('splitView1').move(0,0);");
		Thread.sleep(500);
		
		WebElement myElement = fDriver.findElement(By.id("splitView1"));
		assertEquals("Check move() API: top position", "0px", myElement.getCssValue("top"));
		assertEquals("Check move() API: left position", "0px", myElement.getCssValue("left"));
	}
	
	@Test
	public void testSplit_resize_smaller() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/splitViewAPI.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		js.executeScript("$$('splitView1').resize(10,10);");
		Thread.sleep(500);

		WebElement myElement = fDriver.findElement(By.id("splitView1"));
		assertEquals("Check resize() API: width", "10", myElement.getAttribute("offsetWidth"));
		assertEquals("Check resize() API: height", "10", myElement.getAttribute("offsetHeight"));
	}
	
	@Test
	public void testSplit_resize_bigger() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/splitViewAPI.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		js.executeScript("$$('splitView1').resize(300,300);");
		Thread.sleep(500);

		WebElement myElement = fDriver.findElement(By.id("splitView1"));
		assertEquals("Check resize() API: width", "300", myElement.getAttribute("offsetWidth"));
		assertEquals("Check reisze() API: height", "300", myElement.getAttribute("offsetHeight"));
	}
	
	@Test
	public void testSplit_setWidth() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/splitViewAPI.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		js.executeScript("$$('splitView1').setWidth(100);");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("splitView1")).getAttribute("offsetWidth");
		assertEquals("Check setWidth() API", "100", result);
	}
	
	@Test
	public void testSplit_getWidth() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/splitViewAPI.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('splitView1').getWidth() +'';");;
		assertEquals("Check getWidth() API", "500", result);
	}
	
	@Test
	public void testSplit_setHeight() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/splitViewAPI.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		js.executeScript("$$('splitView1').setHeight(100);");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("splitView1")).getAttribute("offsetHeight");
		assertEquals("Check setHeight() API", "100", result);
	}
	
	@Test
	public void testSplit_getHeight() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/splitViewAPI.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('splitView1').getHeight() +'';");;
		assertEquals("Check getHeight() API", "500", result);
	}
	
	@Test
	public void testSplit_setLeft() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/splitViewAPI.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		js.executeScript("$$('splitView1').setLeft(100);");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("splitView1")).getAttribute("offsetLeft");
		assertEquals("Check setLeft() API", "100", result);
	}
	
	@Test
	public void testSplit_setRight() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/splitViewAPI.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		js.executeScript("$$('splitView1').setRight(100);");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("splitView1")).getCssValue("right");
		assertEquals("Check setRight() API", "100px", result);
	}

	@Test
	public void testSplit_setTop() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/splitViewAPI.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		js.executeScript("$$('splitView1').setTop(100);");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("splitView1")).getAttribute("offsetTop");
		assertEquals("Check setTop() API", "100", result);
	}

	@Test
	public void testSplit_setBottom() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/splitViewAPI.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		js.executeScript("$$('splitView1').setBottom(100);");
		Thread.sleep(500);

		String result = fDriver.findElement(By.id("splitView1")).getCssValue("bottom");
		assertEquals("Check setBottom() API", "100px", result);
	}
	
	@Test
	public void testSplit_getPosition() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/splitViewAPI.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		
		String result = (String) js.executeScript("return $$('splitView1').getPosition().left +'';");
		assertEquals("Check getPosition() API : left", "0", result);

		result = (String) js.executeScript("return $$('splitView1').getPosition().top +'';");
		assertEquals("Check getPosition() API : top", "0", result);
	}
	
	@Test
	public void testSplit_destroy() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/splitViewAPI.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		js.executeScript("$$('splitView1').destroy();");
		Thread.sleep(500);
		
		try{
			fDriver.findElement(By.id("splitView1"));
			assertTrue(false);
		}catch(Exception e){}
	}
	
	@Test
	public void testSplit_disable() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/splitViewAPI.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		js.executeScript("$$('textField1').setValue('aaa');" +
				"$$('splitView1').disable();" +
				"$$('textField1').setValue('bbb');");
		Thread.sleep(500);
		
		String result = (String) js.executeScript("return $$('textField1').getValue();");
		assertEquals("Check disable() API", "aaa", result);
	}
	
	@Test
	public void testSplit_enable() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/splitViewAPI.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		js.executeScript("$$('splitView1').disable();" +
				"$$('splitView1').enable();" +
				"$$('splitView1').setValue('bbb');");
		Thread.sleep(500);
		
		String result = (String) js.executeScript("return $$('splitView1').getValue();");
		assertEquals("Check enable() API", "bbb", result);
	}
	
	@Test
	public void testSplit_getTheme() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/splitViewAPI.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		
		String result = (String) js.executeScript("return $$('splitView1').getTheme();");
		assertEquals("Check getTheme() API", "inherited cupertino", result);
	}
	
	@Test
	public void testSplit_setBackgroundColor() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/splitViewAPI.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		js.executeScript("$$('splitView1').setBackgroundColor('#650092');");
		Thread.sleep(500);
		
		String result = fDriver.findElement(By.id("splitView1")).getCssValue("background-color").replaceAll("\\s","");
		assertEquals("Check setBackgroundColor() API", "rgba(101,0,146,1)", result);
	}
	
	@Test
	public void testSplit_setTextColor() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/splitViewAPI.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		js.executeScript("$$('splitView1').setTextColor('#650092');");
		Thread.sleep(500);
		
		String result = fDriver.findElement(By.id("splitView1")).getCssValue("color").replaceAll("\\s","");
		assertEquals("Check setTextColor() API", "rgba(101,0,146,1)", result);
	}
	
	@Ignore //No setParent() on NavigationView widget
	public void testSplit_setParent() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/splitViewAPI.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		js.executeScript("$$('splitView1').setParent($$('container1'));");
		Thread.sleep(500);
		
		fDriver.findElement(By.id("container1")).findElement(By.id("splitView1"));
	}
	
	@Ignore //No setParent() on NavigationView widget
	public void testSplit_getParent() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/splitViewAPI.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		js.executeScript("$$('splitView1').setParent($$('container1'));");
		Thread.sleep(500);
		
		String result = (String) js.executeScript("return $$('splitView1').getParent().id;");
		assertEquals("Check getParent() API", "container1", result);
	}
	
	@Ignore //No setErrorDiv() on NavigationView widget
	public void testSplit_setErrorDiv() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/splitViewAPI.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		js.executeScript("$$('splitView1').setErrorDiv('container1');");
		Thread.sleep(500);
		
		String result = (String) js.executeScript("return $$('splitView1').errorDiv.selector;");
		assertEquals("Check setErrorDiv() API", "#container1", result);
	}
	
	@Ignore //No setErrorDiv() on NavigationView widget
	public void testSplit_getErrorDiv() throws InterruptedException
	{
		fDriver.get("http://127.0.0.1:8081/splitViewAPI.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		js.executeScript("$$('splitView1').setErrorDiv('container1');");
		Thread.sleep(500);
		
		String result = (String) js.executeScript("return $$('splitView1').getErrorDiv().attr('id');");
		assertEquals("Check getErrorDiv() API", "container1", result);
	}
	
	@Ignore
	// API not implemented; should send back a Exception
	public void testSplit_clear() throws InterruptedException {
		fDriver.get("http://127.0.0.1:8081/splitViewAPI.html");
		JavascriptExecutor js = (JavascriptExecutor) fDriver;
		Thread.sleep(500);
		js.executeScript("$$('splitView1').clear();");
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('body1').getChildren().length +'';");
		assertEquals("Check clear() API", "0", result);
	}
	
}
