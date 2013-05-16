package org.wakanda.qa.http.test.statuscodes;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;

/**
 * @author Ouissam
 *
 */
@RunWith(Suite.class)
@Suite.SuiteClasses({ 
	StatusCode2xxTest.class,
	StatusCode3xxTest.class,
	StatusCode4xxTest.class,
	StatusCode5xxTest.class
	})
public class StatusCodeTestSuite {
}
