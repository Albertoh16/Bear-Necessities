import { useLocation, useNavigate } from "react-router-dom";
import { CompanyInfo } from "../../hooks/use-about-api";

function CompanyInfoDisplayPage(): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();

  
  const companyInfo = location.state?.companyInfo as CompanyInfo | { raw: string } | null;

  if (!companyInfo) {
    return (
      <div className="p-6 flex flex-col items-center">
        <h2 className="text-xl font-semibold">No company info found.</h2>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  
  if ("raw" in companyInfo) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6">Raw AI Output</h1>
        <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap">
          {companyInfo.raw}
        </pre>
        <div className="text-center mt-8">
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

 
  return (
    <div className="p-6 max-w-3xl mx-auto">
      
      <h1 className="text-3xl font-bold text-center mb-8">
        {companyInfo.CompanyName}
      </h1>

      
      <div className="mb-6">
        <h2 className="font-bold underline mb-2">History</h2>
        <p className="whitespace-pre-line">{companyInfo.History}</p>
      </div>

      
      <div className="mb-6">
        <h2 className="font-bold underline mb-2">Values</h2>
        <p className="whitespace-pre-line">{companyInfo.Values}</p>
      </div>

      
      <div className="mb-6">
        <h2 className="font-bold underline mb-2">Environment</h2>
        <p className="whitespace-pre-line">{companyInfo.Environment}</p>
      </div>

      
      <div className="text-center mt-8">
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

export default CompanyInfoDisplayPage;
