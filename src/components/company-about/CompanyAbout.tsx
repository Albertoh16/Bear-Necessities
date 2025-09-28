import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCompanyInfoFromLink } from "../../hooks/use-about-api";
import { FiGlobe, FiSearch, FiTrendingUp } from "react-icons/fi";
import { Card, CardContent, CardFooter, Button, Alert } from "../ui";

function CompanyInfoPage(): JSX.Element {
  const [link, setLink] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!link) return;

    setLoading(true);
    setError("");

    try {
      const data = await fetchCompanyInfoFromLink(link);

      if (data) {
        navigate("/about-company-info", { state: { companyInfo: data } });
      } else {
        setError("Failed to fetch company information. Please try again.");
      }
    } catch (err) {
      setError("An error occurred while fetching company information.");
    } finally {
      setLoading(false);
    }
  };

  const handleClearForm = () => {
    setLink("");
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="mx-auto h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
            <FiGlobe className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Company Insights</h2>
          <p className="text-gray-600">
            Discover thorough information about any company
          </p>
        </div>

        <Card variant="elevated">
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="company-url" className="block text-sm font-medium text-gray-700 mb-2">
                  Company Website URL
                </label>
                <div className="relative">
                  <input
                    id="company-url"
                    type="url"
                    placeholder="https://example.com"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    className="block w-full pl-3 pr-10 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <FiGlobe className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              {error && <Alert variant="error">{error}</Alert>}

              <div className="flex gap-3">
                <Button
                  type="submit"
                  disabled={!link || loading}
                  loading={loading}
                  leftIcon={!loading ? <FiSearch /> : undefined}
                  className="flex-1"
                >
                  {loading ? "Analyzing..." : "Analyze Company"}
                </Button>

                {link && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleClearForm}
                  >
                    Clear
                  </Button>
                )}
              </div>
            </form>
          </CardContent>

          <CardFooter>
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">What you'll discover:</h3>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <FiTrendingUp className="mr-2 h-4 w-4 text-blue-500" />
                  Company history and background
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <FiTrendingUp className="mr-2 h-4 w-4 text-blue-500" />
                  Core values and mission
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <FiTrendingUp className="mr-2 h-4 w-4 text-blue-500" />
                  Work environment and culture
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default CompanyInfoPage;
