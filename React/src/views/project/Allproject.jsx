import { useEffect, useState } from "react";
import axiosClient from "../../axios-clint";
import { Link } from "react-router-dom";

function Table({ projectsData, meta, onPageChange, onPriorityChange }) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-4">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h2 className="text-lg font-semibold">Projects</h2>
          <p className="mt-1 text-sm text-gray-700">
            This is a list of all projects.
          </p>
        </div>
        <div>
          <Link
            to="/project/add"
            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Add new projects
          </Link>
        </div>
      </div>

      <div className="mt-6 flex flex-col">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3.5 text-left text-sm font-normal text-gray-700">ID</th>
                    <th className="px-12 py-3.5 text-left text-sm font-normal text-gray-700">Title</th>
                    <th className="px-4 py-3.5 text-left text-sm font-normal text-gray-700">Description</th>
                    <th className="px-4 py-3.5 text-left text-sm font-normal text-gray-700">Status</th>
                    <th className="px-4 py-3.5 text-left text-sm font-normal text-gray-700">Priority</th>
                    <th className="px-4 py-3.5 text-left text-sm font-normal text-gray-700">Due Date</th>
                    <th className="px-4 py-3.5 text-left text-sm font-normal text-gray-700">Creator</th>
                    <th className="px-4 py-3.5 text-left text-sm font-normal text-gray-700">Created At</th>
                    <th className="px-4 py-3.5 text-left text-sm font-normal text-gray-700">Total Task</th>
                    <th className="px-4 py-3.5 text-right text-sm font-normal text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {projectsData.map((project) => (
                    <tr key={project.id}>
                      <td className="px-4 py-4 text-sm text-gray-900">{project.id}</td>
                      <td className="px-12 py-4 text-sm text-gray-900">{project.name}</td>
                      <td className="px-4 py-4 text-sm text-gray-900">{project.description}</td>
                      <td className="px-4 py-4">
                        <button
                          className={`rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm ${
                            project.status === "In_Progress"
                              ? "bg-yellow-600"
                              : project.status === "New"
                              ? "bg-blue-300"
                              : "bg-green-500"
                          }`}
                        >
                          {project.status}
                        </button>
                      </td>
                      <td className="px-4 py-4">
                        <select
                          className={`rounded-md px-3 py-2 text-sm font-semibold text-white ${
                            project.priority === "High"
                              ? "bg-red-500"
                              : project.priority === "Medium"
                              ? "bg-green-700"
                              : "bg-blue-500"
                          }`}
                          value={project.priority}
                          onChange={(e) => onPriorityChange(e.target.value, project.id)}
                        >
                          <option value="High">High</option>
                          <option value="Medium">Medium</option>
                          <option value="Low">Low</option>
                        </select>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700">{project.due_date}</td>
                      <td className="px-4 py-4 text-sm text-gray-700">{project.creator_name}</td>
                      <td className="px-4 py-4 text-sm text-gray-700">{project.created_at}</td>
                      <td className="px-4 py-4 text-sm text-gray-700">{project.total_task}</td>
                      <td className="px-4 py-4 text-right">
                        <Link to={`/project/${project.id}`} className="text-blue-600 hover:underline">
                          Select
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center pt-6">
        {meta.links?.map((link, index) => (
          <button
            key={index}
            onClick={() => onPageChange(link.url)}
            className={`mx-1 flex items-center rounded-md border px-3 py-1 text-gray-900 ${
              link.active ? "bg-green-100" : ""
            }`}
          >
            {link.label === "&laquo; Previous" ? "«" : link.label === "Next &raquo;" ? "»" : link.label}
          </button>
        ))}
      </div>
    </section>
  );
}

export default function AllProjects() {
  const [projects, setProjects] = useState([]);
  const [meta, setMeta] = useState({});
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (search.trim()) fetchProjects(search);
  }, [search]);

  const fetchProjects = (query = "") => {
    setLoading(true);
    const endpoint = query ? `/projects/search/${query}` : "/projects";
    axiosClient
      .get(endpoint)
      .then(({ data }) => {
        setProjects(data.data);
        setMeta(data.meta);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const handlePriorityChange = (newPriority, id) => {
    axiosClient.put(`/projects/priorityupdate/${id}`, { priority: newPriority }).then(() => fetchProjects());
  };

  const handlePageChange = (url) => {
    if (!url) return;
    axiosClient.get(url).then(({ data }) => {
      setProjects(data.data);
      setMeta(data.meta);
    });
  };

  return (
    <div>
      <div className="flex justify-center">
        <input
          className="w-full md:w-1/3 rounded-md border px-3 py-2"
          type="text"
          placeholder="Search by ID or Title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <p>Loading projects...</p>
      ) : projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <Table
          projectsData={projects}
          meta={meta}
          onPageChange={handlePageChange}
          onPriorityChange={handlePriorityChange}
        />
      )}
    </div>
  );
}
