import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Societies() {
  const [societies, setSocieties] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    type: "",
    joinLink: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    type: "",
    description: "",
    joinLink: "",
  });

  const user = localStorage.getItem("user");

  useEffect(() => {
    fetchSocieties();
  }, []);

  const fetchSocieties = async () => {
    const res = await axios.get("http://localhost:5000/api/societies");
    setSocieties(res.data);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/societies", form);
      setForm({ name: "", description: "", type: "", joinLink: "" });
      fetchSocieties();
    } catch {
      alert("Creation failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this society?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/societies/${id}`);
      fetchSocieties();
    } catch (err) {
      alert("Failed to delete");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-extrabold text-indigo-700 mb-6 text-center">🌐 College Societies</h2>

      {/* Create Form */}
      <form
        onSubmit={handleCreate}
        className="mb-10 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 p-6 rounded-xl shadow-lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Society Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="p-2 border rounded w-full"
          />
          <input
            type="text"
            placeholder="Type (Tech, Cultural, etc)"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="p-2 border rounded w-full"
          />
          <input
            type="text"
            placeholder="Google Form Join Link"
            value={form.joinLink}
            onChange={(e) => setForm({ ...form, joinLink: e.target.value })}
            className="p-2 border rounded w-full"
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="p-2 border rounded col-span-1 md:col-span-2"
          />
        </div>
        <button className="mt-4 w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">
          ➕ Add Society
        </button>
      </form>

      {/* Display Societies */}
      <div className="grid grid-cols-1 gap-6">
        {societies.map((s) => (
          <div
            key={s._id}
            className="bg-white border border-gray-200 p-6 rounded-lg shadow hover:shadow-lg transition relative"
          >
            {editingId === s._id ? (
              // Edit Mode
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  try {
                    await axios.put(`http://localhost:5000/api/societies/${s._id}`, editForm);
                    setEditingId(null);
                    fetchSocieties();
                  } catch {
                    alert("Update failed");
                  }
                }}
              >
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full mb-2 p-2 border rounded"
                />
                <input
                  type="text"
                  value={editForm.type}
                  onChange={(e) => setEditForm({ ...editForm, type: e.target.value })}
                  className="w-full mb-2 p-2 border rounded"
                />
                <textarea
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  className="w-full mb-2 p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Google Form Join Link"
                  value={editForm.joinLink}
                  onChange={(e) => setEditForm({ ...editForm, joinLink: e.target.value })}
                  className="w-full mb-2 p-2 border rounded"
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingId(null)}
                    className="bg-gray-400 text-white px-4 py-1 rounded hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              // View Mode
              <>
                <h3 className="text-xl font-bold text-gray-800">{s.name} <span className="text-sm text-gray-500">({s.type})</span></h3>
                <p className="text-gray-600 mt-2">{s.description}</p>

                {s.joinLink ? (
                  <a
                    href={s.joinLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Join via Form
                  </a>
                ) : (
                  <p className="text-sm text-gray-400 mt-2 italic">No join link provided</p>
                )}

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => {
                      setEditingId(s._id);
                      setEditForm({
                        name: s.name,
                        type: s.type,
                        description: s.description,
                        joinLink: s.joinLink || "",
                      });
                    }}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    ✏️ Edit
                  </button>

                  <button
                    onClick={() => handleDelete(s._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
