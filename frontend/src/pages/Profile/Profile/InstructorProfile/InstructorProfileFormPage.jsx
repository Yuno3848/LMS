import {
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Camera,
  Save,
  User,
  BookOpen,
  Globe,
  Star,
  GraduationCap,
  CheckCircle,
} from "lucide-react";

const InstructorProfileForm = ({
  title,
  formData,
  setFormData,
  handleSubmit,
  submitLabel,
  submitIcon,
}) => {
 console.log("instructor profile form data :", formData)
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 via-amber-50 to-yellow-50 py-12 px-4">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-stone-200/50 p-8 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-stone-200/20 to-amber-200/20 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-yellow-100/20 to-stone-200/20 rounded-full translate-y-12 -translate-x-12"></div>
          <div className="relative z-10 text-center">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-amber-700 to-stone-700 rounded-2xl shadow-lg">
                <User className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-stone-700 to-amber-800 bg-clip-text text-transparent">
                {title}
              </h1>
            </div>
            <p className="text-stone-600/80 text-lg font-medium">
              Share your teaching journey and expertise
            </p>
          </div>
        </div>

        {/* Main Profile Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-stone-200/50 overflow-hidden">
          {/* Profile Picture */}
          <div className="bg-gradient-to-r from-stone-100 to-amber-100 p-8 text-center relative">
            <div className="absolute inset-0 bg-gradient-to-br from-stone-50/50 to-amber-50/50"></div>
            <div className="relative inline-block group">
              <div className="w-40 h-40 rounded-full bg-gradient-to-br from-amber-600 via-stone-600 to-amber-700 p-1 shadow-2xl">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-amber-200 to-stone-300 flex items-center justify-center overflow-hidden">
                  <User className="w-20 h-20 text-stone-700" />
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-3 shadow-lg border-2 border-stone-200 group-hover:scale-110 transition-transform cursor-pointer">
                <Camera className="w-6 h-6 text-stone-600" />
              </div>
            </div>
          </div>

          <div className="p-8 space-y-8">
            {/* Bio */}
            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-stone-800 flex items-center gap-3 border-b border-stone-200 pb-3">
                <div className="p-2 bg-stone-100 rounded-lg">
                  <BookOpen className="w-5 h-5 text-stone-600" />
                </div>
                About You
              </h2>
              <textarea
                value={formData?.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                rows="4"
                placeholder="Tell students about your background and teaching style..."
                className="w-full px-4 py-3 border-2 border-stone-200 rounded-xl bg-stone-50/50 focus:border-stone-400 focus:bg-white focus:ring-4 focus:ring-stone-100 transition-all duration-200 outline-none resize-none placeholder:text-stone-400"
              />
            </section>

            {/* Expertise */}
            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-stone-800 flex items-center gap-3 border-b border-stone-200 pb-3">
                <div className="p-2 bg-stone-100 rounded-lg">
                  <Star className="w-5 h-5 text-stone-600" />
                </div>
                Expertise
              </h2>
              <input
                type="text"
                value={formData?.expertise}
                onChange={(e) =>
                  setFormData({ ...formData, expertise: e.target.value })
                }
                placeholder="E.g., Web Development, Data Science"
                className="w-full px-4 py-3 border-2 border-stone-200 rounded-xl bg-stone-50/50 focus:border-stone-400 focus:bg-white focus:ring-4 focus:ring-stone-100 transition-all duration-200 outline-none placeholder:text-stone-400"
              />
            </section>

            {/* Rating & Verification */}
            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-stone-800 flex items-center gap-3 border-b border-stone-200 pb-3">
                <div className="p-2 bg-stone-100 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-stone-600" />
                </div>
                Status
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-semibold text-stone-700">
                    Rating
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={formData?.rating}
                    onChange={(e) =>
                      setFormData({ ...formData, rating: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-stone-200 rounded-xl bg-stone-50/50 focus:border-stone-400 focus:bg-white focus:ring-4 focus:ring-stone-100 outline-none"
                  />
                </div>
                {/* <div>
                  <label className="text-sm font-semibold text-stone-700">
                    Verification Status
                  </label>
                  <select
                    value={formData.isVerifiedInstructor}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        isVerifiedInstructor: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border-2 border-stone-200 rounded-xl bg-stone-50/50 focus:border-stone-400 focus:bg-white focus:ring-4 focus:ring-stone-100 outline-none"
                  >
                    <option value="not_requested">Not Requested</option>
                    <option value="pending">Pending</option>
                    <option value="verified">Verified</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div> */}
              </div>
            </section>

            {/* Social Links */}
            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-stone-800 flex items-center gap-3 border-b border-stone-200 pb-3">
                <div className="p-2 bg-stone-100 rounded-lg">
                  <Globe className="w-5 h-5 text-stone-600" />
                </div>
                Social Links
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {["linkedin", "twitter", "facebook", "instagram"].map(
                  (platform) => {
                    const Icon = {
                      linkedin: Linkedin,
                      twitter: Twitter,
                      facebook: Facebook,
                      instagram: Instagram,
                    }[platform];
                    return (
                      <div key={platform} className="space-y-2">
                        <label className="text-sm font-semibold text-stone-700 flex items-center gap-2">
                          <Icon className="w-4 h-4" />
                          {platform.charAt(0).toUpperCase() + platform.slice(1)}
                        </label>
                        <input
                          type="url"
                          value={formData?.socialLinks[platform]}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              socialLinks: {
                                ...formData?.socialLinks,
                                [platform]: e.target.value,
                              },
                            })
                          }
                          placeholder={`https://${platform}.com/yourprofile`}
                          className="w-full px-4 py-3 border-2 border-stone-200 rounded-xl bg-stone-50/50 focus:border-stone-400 focus:bg-white focus:ring-4 focus:ring-stone-100 transition-all outline-none placeholder:text-stone-400"
                        />
                      </div>
                    );
                  }
                )}
              </div>
            </section>

            {/* Submit */}
            <div className="flex justify-center pt-8">
              <button className="group relative px-8 py-4 bg-stone-800 hover:bg-stone-900 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-3">
                  {submitIcon || <Save className="w-5 h-5" />}
                  {submitLabel}
                </div>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default InstructorProfileForm;
