import { createClient} from "redis";

const redis = createClient();

redis.on('error', (err) => console.log('Redis Client Error', err));

async function connectRedis() {
    await redis.connect();
}

connectRedis().then(()=>console.log("Connected to redis")).catch(console.error);

export async function getAsync(key: string) {
  if(key){
    const exists = await redis.exists(key);
    if (exists) {
      // If the key exists, retrieve its value
      const value = await redis.get(key);
      return value;
    } else {
      // Handle the case where the key does not exist
      return null; // or throw an error, or handle it as needed
    }
  }
  }
  
  export async function setAsync(
    key: string,
    value: string,
    mode?: 'EX' | 'PX',
    expiration?: number
  ){
    if (mode && expiration) {
      // Use `setEx` for expiration in seconds or `setPX` for milliseconds
      return redis.setEx(key, expiration, value);
    }
    return redis.set(key, value);
  }


  export interface ProblemInterface {
    slug?: string; // Unique identifier for the problem
    description: string; // Description of the problem
    boilerplateCppHalf: string; // Boilerplate code for C++ (half)
    boilerplateJavaHalf: string; // Boilerplate code for Java (half)
    boilerplateJavascriptHalf: string; // Boilerplate code for JavaScript (half)
    boilerplatePythonHalf: string; // Boilerplate code for Python (half)
    boilerplateCppFull: string; // Boilerplate code for C++ (full)
    boilerplateJavaFull: string; // Boilerplate code for Java (full)
    boilerplateJavascriptFull: string; // Boilerplate code for JavaScript (full)
    boilerplatePythonFull: string; // Boilerplate code for Python (full)
    test_cases: any; // JSON object for test cases
    test_cases_ans: any; // JSON object for test cases answers
    level?: string; // Level of the problem (e.g., Easy, Medium, Hard)
    total_submissions?: number; // Total number of submissions
    pass_percent?: number; // Pass percentage of submissions
  }