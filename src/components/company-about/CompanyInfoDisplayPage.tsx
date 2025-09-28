import { useLocation, useNavigate } from "react-router-dom";
import { CompanyInfo } from "../../hooks/use-about-api";
import { FiArrowLeft, FiHome, FiClock, FiHeart, FiUsers } from "react-icons/fi";
import { Card, CardContent, Button } from "../ui";

function CompanyInfoDisplayPage(): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();

  const companyInfo = location.state?.companyInfo as CompanyInfo | { raw: string } | null;

  if (!companyInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="min-h-[80vh] bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4">
        <Card variant="elevated" className="max-w-md w-full text-center">
          <CardContent>
            <div className="mx-auto h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <FiHome className="h-8 w-8 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No Company Information Found</h2>
            <p className="text-gray-600 mb-6">The company information could not be retrieved. Please try again.</p>
            <Button
              onClick={() => navigate("/about-company")}
              leftIcon={<FiArrowLeft />}
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
        </div>
      </div>
    );
  }

  if ("raw" in companyInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="min-h-[80vh] w-full bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card variant="elevated" className="overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-blue-600 px-6 py-4">
              <h1 className="text-2xl font-bold text-white">AI Analysis Results</h1>
              <p className="text-green-100 mt-1">Raw output from AI analysis</p>
            </div>
            <CardContent>
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <pre className="whitespace-pre-wrap text-sm text-gray-800 overflow-auto">
                  {companyInfo.raw}
                </pre>
              </div>
              <div className="flex justify-center">
                <Button
                  onClick={() => navigate("/about-company")}
                  leftIcon={<FiArrowLeft />}
                  size="lg"
                >
                  Analyze Another Company
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center mt-[450px]">
      <div className="min-h-[80vh] w-full bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Card variant="elevated" className="overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 px-6 py-8 text-center">
            <h1 className="text-4xl font-bold text-white mb-2">
              {companyInfo.CompanyName}
            </h1>
            <p className="text-green-100">Company Profile & Insights</p>
          </div>

          <CardContent className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-5">
              <div className="text-center">
                <div className="mx-auto h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                  <FiClock className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900">History</h3>
                <p className="text-sm text-gray-600">Background & Timeline</p>
              </div>
              <div className="text-center">
                <div className="mx-auto h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                  <FiHeart className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Values</h3>
                <p className="text-sm text-gray-600">Mission & Principles</p>
              </div>
              <div className="text-center">
                <div className="mx-auto h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                  <FiUsers className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Environment</h3>
                <p className="text-sm text-gray-600">Culture & Workplace</p>
              </div>
            </div>

            <div className="space-y-8">
              <Card variant="outlined" className="bg-blue-50 border-blue-200">
                <CardContent>
                  <div className="flex items-center mb-4">
                    <FiClock className="h-5 w-5 text-blue-600 mr-3" />
                    <h2 className="text-xl font-bold text-gray-900">Company History</h2>
                  </div>
                  <div className="prose prose-blue max-w-none">
                    <p className="whitespace-pre-line text-gray-700 leading-relaxed">
                      {companyInfo.History}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card variant="outlined" className="bg-green-50 border-green-200">
                <CardContent>
                  <div className="flex items-center mb-4">
                    <FiHeart className="h-5 w-5 text-green-600 mr-3" />
                    <h2 className="text-xl font-bold text-gray-900">Values & Mission</h2>
                  </div>
                  <div className="prose prose-green max-w-none">
                    <p className="whitespace-pre-line text-gray-700 leading-relaxed">
                      {companyInfo.Values}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card variant="outlined" className="bg-purple-50 border-purple-200">
                <CardContent>
                  <div className="flex items-center mb-4">
                    <FiUsers className="h-5 w-5 text-purple-600 mr-3" />
                    <h2 className="text-xl font-bold text-gray-900">Work Environment</h2>
                  </div>
                  <div className="prose prose-purple max-w-none">
                    <p className="whitespace-pre-line text-gray-700 leading-relaxed">
                      {companyInfo.Environment}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-center pt-8 border-t border-gray-200">
              <Button
                onClick={() => navigate("/about-company")}
                leftIcon={<FiArrowLeft />}
                size="lg"
                className="shadow-sm"
              >
                Analyze Another Company
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      </div>
    </div>
  );
}

export default CompanyInfoDisplayPage;
