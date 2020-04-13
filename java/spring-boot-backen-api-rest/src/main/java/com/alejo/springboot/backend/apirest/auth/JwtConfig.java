package com.alejo.springboot.backend.apirest.auth;

public class JwtConfig {
public static final String LLAVE_SECRETA = "B1T4C0R4.R3T0S.2020@P0L1";
	
	public static final String RSA_PRIVATE = "-----BEGIN RSA PRIVATE KEY-----\r\n" + 
			"MIIEpAIBAAKCAQEA1T8WaymxFIRc4yZamG+sxwWZOXM7lZ9EWVQsZnM1vuuutJyj\r\n" + 
			"bXhQkEZDLUhtr1uIuvdjEIQaWV476V1MMhaE/mMzjFGe2OBs3ma8zkWVF2s8v0de\r\n" + 
			"2cfc9QL/iDvB/9QLxOGLgZyT6swHOadWA/IRZ/xaxqCOQQ7RyrDB5WDWSRNoyNFE\r\n" + 
			"/RxTeGCPCn2WMNY6Rdq1Qfbbud0d6bUYDgDdqUlrghmSeKsdafMO5xMemHmpe5Ew\r\n" + 
			"CDhlYa77XVOq5SOd1pppcDU6F+yzLWXm1Slb+4Y4fgtfscL8ToqJ4VVpeVPjcINK\r\n" + 
			"qZvF0VRMZvGK2Z3SAfgSGt9oP+WOdpLj6rgTiwIDAQABAoIBAQCWQJJqRYEJBM5y\r\n" + 
			"Gpcg6ybhQHea/C+SmBrPmjiCo1DOSj/Z8LhSLMEPNwKkSHFIaoVnv2GkxH/QUk6C\r\n" + 
			"eoNyk1135KvwhZ4YD+GFvvvvlyWaz6uI1x/k8Scl18v20Kw7tsvoGEd0tr+eY83/\r\n" + 
			"eIFp3EkZbL0FUSGKg4ecenjURywVZfadCPUMg16rKuSTtFEU8WilByWqCHIj/mOU\r\n" + 
			"BlLZkMdEk1ilpO9uslcw8c+TyE5OYmziDIi8vfqDpGlySVLUHddzuw3kp6pjociu\r\n" + 
			"P2Gn9vpA4E2Uekx0gOl0H1T1UElZUCXdhYFm1NuPu7js1cvI/oqJYT4Tvyhi4dJ4\r\n" + 
			"qAEtZB6pAoGBAPoUxB0xFIEJXzq1rQ64yBspHBvnhZcAuYwrblKwqzLbgWyo7f8o\r\n" + 
			"Ov/r1oxa/OjubhVj6DbBG97+3LfuhT0hkqQgwPj4vuik1Rxt6DZf+UQb1xAFV/mw\r\n" + 
			"7/t/kgBHaXx7ck7+Hf4reD39WZIwWugW3kDRyfraZ8cbDqbNwXwvdqTHAoGBANpL\r\n" + 
			"JCrrz7NDTh/ux6pqisAX3Ix++0m+V3qlKFufAnLojgcDt2AL4MMU09I4fFEAuxzw\r\n" + 
			"y4vtvAbSxPlmxki+tjGlHXht5VhmY+Bkj1BXbL391wFIcSH8g7ym2dcvMeQ2Ybb3\r\n" + 
			"BR+369h6KrkDPhRx30748/0GFVXsm0/N4budIk8dAoGABQh79fZx6jLtFrpnVD+F\r\n" + 
			"z34hUbJ0LtjV4ytQmhtyJqDiVvSDbbo6jcIKXGLMake6MXYES23RiMhqWs1TIyrU\r\n" + 
			"z7bVC22+MeJ3Y44WuVlvI97Hkkv5PE5CVjZ4EsddKSM25r4YjnADiIPb1KRif/9N\r\n" + 
			"09IlFYZlxk0WG2dSuJQf+CsCgYBiMKCBKfcQNHskw/xN/ISS6WjMTaXswtCIm1eu\r\n" + 
			"9rRcSZzxLMvESTN9rJWnHr9UlFaWKv3z4CjOjOoLIR6ZxCch55p8/DnIbK4KVlFc\r\n" + 
			"myaPw2l96z7wQaxkJE0ijNkNRSTo7u4AGXPduP4UoI/BFIOU+0iMjLr2HmqyF/Ks\r\n" + 
			"uH6hRQKBgQDW4CI0pc3QP99YbBRGsqjUeGkOwOwSvyh5kZ29TQWA/BGZVvFTUp/n\r\n" + 
			"dY5gQcz5oMzMxGXtbhCaswBwSNbAJYTW6FgcrfkE2oH/2ShbzDdgAXvuyGTdNFtJ\r\n" + 
			"465rUAQ/g6/HbvheDr5rj3CvPvig543/Rrhzl+KEL2MENh7SgG9lBQ==\r\n" + 
			"-----END RSA PRIVATE KEY-----";
	
	public static final String RSA_PUBLIC = "-----BEGIN PUBLIC KEY-----\r\n" + 
			"MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1T8WaymxFIRc4yZamG+s\r\n" + 
			"xwWZOXM7lZ9EWVQsZnM1vuuutJyjbXhQkEZDLUhtr1uIuvdjEIQaWV476V1MMhaE\r\n" + 
			"/mMzjFGe2OBs3ma8zkWVF2s8v0de2cfc9QL/iDvB/9QLxOGLgZyT6swHOadWA/IR\r\n" + 
			"Z/xaxqCOQQ7RyrDB5WDWSRNoyNFE/RxTeGCPCn2WMNY6Rdq1Qfbbud0d6bUYDgDd\r\n" + 
			"qUlrghmSeKsdafMO5xMemHmpe5EwCDhlYa77XVOq5SOd1pppcDU6F+yzLWXm1Slb\r\n" + 
			"+4Y4fgtfscL8ToqJ4VVpeVPjcINKqZvF0VRMZvGK2Z3SAfgSGt9oP+WOdpLj6rgT\r\n" + 
			"iwIDAQAB\r\n" + 
			"-----END PUBLIC KEY-----";
}
