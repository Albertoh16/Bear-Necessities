import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCompanyInfoFromLink } from "../../hooks/use-about-api"; 


function CompanyInfoPage(): JSX.Element {
  const [link, setLink] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!link) return;

    setLoading(true);
    const data = await fetchCompanyInfoFromLink(link);
    setLoading(false);

    if (data) {
      // 🚀 Navigate to results page and pass company info in state
      navigate("/about-company-info", { state: { companyInfo: data } });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-6">
      <h2 className="mb-4 text-xl font-semibold">Fetch Company Info</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4 w-full max-w-lg"
      >
        <input
          type="url"
          placeholder="Enter company link..."
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="border rounded px-3 py-2 w-full"
          required
        />
        <button
          type="submit"
          disabled={!link || loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Processing..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default CompanyInfoPage;
