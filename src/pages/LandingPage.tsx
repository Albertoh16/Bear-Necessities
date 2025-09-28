
import LandingForm from "../components/landing/LandingForm";

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-green-50 to-blue-50 overflow-y-auto">
      <div className="container mx-auto px-4 pt-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6 mt-5">
            <span className="text-6xl mr-4">🐻</span>
            <h1 className="text-5xl font-bold">
              Prep<span className="text-green-600">Bear</span>
            </h1>
          </div>
          <p className="text-xl text-gray-600 mb-8">Your AI Interview Coach</p>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Practice interviews with our AI-powered virtual interviewer.
            Upload your resume, select your interview type, and get
            personalized coaching for your dream job.
          </p>
        </div>
      </div>
      <div className="pt-20 pb-20 bg-neutral-15/5 border-t-2 border-gray-700 w-full px-4">
          <div className="container mx-auto">
          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📄</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Upload Resume</h3>
              <p className="text-gray-600">
                Share your resume so our AI can provide personalized feedback
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Choose Focus</h3>
              <p className="text-gray-600">
                Select behavioral or technical interview practice
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Practice Live</h3>
              <p className="text-gray-600">
                Have real-time conversations with our AI interviewer
              </p>
            </div>
          </div>

          {/* Form */}
          <LandingForm />
          </div>
        </div>
    </div>
  );
}