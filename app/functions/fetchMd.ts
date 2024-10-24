"use server"
import prisma from "@/util/prismaDb";

const fetchMdAndCppBoilerplate = async (slug: string) => {
  try {
    const resp = await prisma.problems.findUnique({
      where: {
        slug: slug,
      },
      select: {
        description: true,
        // boilerplateCppHalf: true,
      },
    });
    // const plainResp = JSON.parse(JSON.stringify(resp));
    console.log(resp);
    if (!resp) {
      return { error: "Problem not found", status: "404" };
    }

return {resp:resp.description}
    // return {
    //   data: {
    //     description: resp.description,
    //     boilerplateCppHalf: resp.boilerplateCppHalf,
    //   },
    //   error: null,
    //   status: 200,
    // };
  } catch (error) {
    return { error: error, status: "500" }; // Return a more specific error message
  }
};

export default fetchMdAndCppBoilerplate;



// model Problems{
//     slug String @id
//     description String
//     boilerplateCppHalf String
//     boilerplateJavaHalf String
//     boilerplateJavascriptHalf String
//     boilerplatePythonHalf String
//     boilerplateCppFull String
//     boilerplateJavaFull String
//     boilerplateJavascriptFull String
//     boilerplatePythonFull String
//     test_cases String
//     test_cases_ans String
//     level String
//     total_submissions Int @default(0)
//     pass_percent Decimal @default(0)
//     submissions  Submissions[]
//   }