import AppLayout from "../../layouts/AppLayout";
import {
  FaSearch,
  FaUpload,
  FaFilePdf,
  FaFileWord,
  FaFilePowerpoint,
  FaFileAlt,
} from "react-icons/fa";
import { useEffect, useState, useRef } from "react";
import API from "../../api/axios";

function Resources() {
  const [sortOrder, setSortOrder] = useState("asc");
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Added state for the search bar
  
  const [searchTerm, setSearchTerm] =
  useState("")
  const fileInputRef = useRef(null);

  const fetchResources = async () => {
    setLoading(true);
    try {
      const res = await API.get("/resources");
      setResources(res.data.resources);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("file", file);

      await API.post("/resources/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Resource uploaded successfully");
      fetchResources();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Upload failed");
    }
  };

  const getIcon = (type) => {
    if (type?.includes("pdf")) return <FaFilePdf />;
    if (type?.includes("word") || type?.includes("document")) return <FaFileWord />;
    if (type?.includes("presentation") || type?.includes("powerpoint")) return <FaFilePowerpoint />;
    return <FaFileAlt />;
  };

  const pdfCount = resources.filter((r) => r.filetype?.includes("pdf")).length;

  // Filter resources based on the search query before rendering
  const filteredResources = resources.filter((r) =>
  (r.original_name || "")
    .toLowerCase()
    .includes(searchTerm.toLowerCase())
);

  return (
    <AppLayout>
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold">Resources</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Organize and access all your study materials.
          </p>
        </div>

        <div>
          <div className="flex gap-3">
            <button
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="px-5 py-3 rounded-xl bg-gray-700 text-white font-semibold"
            >
              {sortOrder === "asc" ? "A → Z" : "Z → A"}
            </button>

            <button
              onClick={() => fileInputRef.current.click()}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#7AC943] text-black font-semibold hover:scale-105 transition-all"
            >
              <FaUpload />
              Upload Resource
            </button>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleUpload}
              className="hidden"
            />
          </div>
        </div> {/* FIXED: Added missing closing tag for right-side header div */}
      </div> {/* FIXED: Added missing closing tag for main flex container */}

      {/* SEARCH */}
      <div className="mt-8 relative">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
  type="text"
  placeholder="Search resources..."
  value={searchTerm}
  onChange={(e) =>
    setSearchTerm(e.target.value)
  }
  className="
  w-full
  pl-12
  pr-4
  py-4
  rounded-2xl
  bg-white
  dark:bg-[#1A1D21]
  border
  border-gray-200
  dark:border-gray-700
  outline-none
  text-gray-900
  dark:text-white
  "
/>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="p-6 rounded-2xl bg-white dark:bg-[#1A1D21] text-gray-900 dark:text-white">
          <h3 className="text-sm text-gray-600 dark:text-gray-400">Total Resources</h3>
          <p className="text-3xl font-bold mt-3">{resources.length}</p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-[#1A1D21] text-gray-900 dark:text-white">
          <h3 className="text-sm text-gray-600 dark:text-gray-400">PDFs</h3>
          <p className="text-3xl font-bold mt-3">{pdfCount}</p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-[#1A1D21] text-gray-900 dark:text-white">
          <h3 className="text-sm text-gray-600 dark:text-gray-400">Recent Uploads</h3>
          <p className="text-3xl font-bold mt-3">
          {filteredResources.length}
        </p>
        </div>
      </div>

      {/* EMPTY STATE */}
      {!loading && filteredResources.length === 0 && (
        <div className="mt-8 p-10 rounded-2xl bg-white dark:bg-[#1A1D21] text-center text-gray-600 dark:text-gray-300">
          No resources found.
        </div>
      )}

      {/* RESOURCE GRID */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {[...filteredResources]
          .sort((a, b) => {
            const nameA = a.original_name || "";
            const nameB = b.original_name || "";
            return sortOrder === "asc"
              ? nameA.localeCompare(nameB)
              : nameB.localeCompare(nameA);
          })
          .map((resource) => (
            <div
              key={resource.id}
              className="p-6 rounded-2xl bg-white dark:bg-[#1A1D21] text-gray-900 dark:text-white hover:scale-[1.02] transition-all"
            >
              <div className="text-4xl mb-4">{getIcon(resource.filetype)}</div>

              <h3 className="font-semibold text-lg break-words">
                {resource.original_name}
              </h3>

              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {(resource.filesize / 1024).toFixed(1)} KB
              </p>

              <div className="flex flex-wrap gap-2 mt-4">
                {resource.filetype?.includes("pdf") ? (
                  <button
                    onClick={() =>
                      window.open(
                        `http://localhost:5000/uploads/${resource.filename}`,
                        "_blank"
                      )
                    }
                    className="px-3 py-2 rounded-lg bg-blue-500 text-white text-sm"
                  >
                    Open PDF
                  </button>
                ) : (
                  <button
                    onClick={async () => {
                      try {
                        const response = await fetch(
                          `http://localhost:5000/uploads/${resource.filename}`
                        );
                        const blob = await response.blob();
                        const url = window.URL.createObjectURL(blob);
                        const link = document.createElement("a");
                        link.href = url;
                        link.download = resource.original_name || resource.filename;
                        document.body.appendChild(link);
                        link.click();
                        link.remove();
                        window.URL.revokeObjectURL(url);
                      } catch {
                        alert("Download failed");
                      }
                    }}
                    className="px-3 py-2 rounded-lg bg-green-500 text-white text-sm"
                  >
                    Download
                  </button>
                )}

                <button
                  onClick={async () => {
                    const newName = prompt("Enter new file name");
                    if (!newName) return;
                    try {
                      await API.put(`/resources/${resource.id}`, { newName });
                      fetchResources();
                    } catch {
                      alert("Rename failed");
                    }
                  }}
                  className="px-3 py-2 rounded-lg bg-yellow-500 text-black text-sm"
                >
                  Rename
                </button>

                <button
                  onClick={async () => {
                    const confirmDelete = window.confirm("Delete this file?");
                    if (!confirmDelete) return;
                    try {
                      await API.delete(`/resources/${resource.id}`);
                      fetchResources();
                    } catch {
                      alert("Delete failed");
                    }
                  }}
                  className="px-3 py-2 rounded-lg bg-red-500 text-white text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </AppLayout>
  );
}

export default Resources;