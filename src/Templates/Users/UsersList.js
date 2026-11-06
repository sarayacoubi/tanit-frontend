import "./usersList.css";

import { getAllUsers, deleteOneUser } from "../../Redux/Actions/UsersActions";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import ConfirmDelete from "../Feedback/ConfirmDelete";
import AddUser from "./AddUser";
import Loading from "../Feedback/Loading";

const UsersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const users = useSelector((state) => state.UsersReducer.users);

  const [showAddUser, setShowAddUser] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  useEffect(() => {
    dispatch(getAllUsers()).finally(() => setLoading(false));
  }, [dispatch]);

  const handleDeleteClick = (id) => {
    setSelectedUserId(id);
    setShowDeleteConfirm(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
    setSelectedUserId(null);
  };

  const handleConfirmDelete = () => {
    if (!selectedUserId) return;

    dispatch(deleteOneUser(selectedUserId));

    setShowDeleteConfirm(false);
    setSelectedUserId(null);
  };

  const filteredUsers = useMemo(() => {
    if (!Array.isArray(users)) return [];

    return users.filter((user) => {
      const matchesSearch =
        user.name?.toLowerCase().includes(search.toLowerCase()) ||
        user.email?.toLowerCase().includes(search.toLowerCase());

      const matchesRole = roleFilter === "all" || user.role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [users, search, roleFilter]);

  if (loading) {
    return <Loading show={loading} />;
  }
  return (
    <div className="usersListContainer">
      {/* HEADER */}

      <div className="usersListHeader">
        <div>
          <h2>Gestion des utilisateurs</h2>
          <p>Consultez et gérez les utilisateurs de votre boutique.</p>
        </div>

        <button
          type="button"
          className="addUserBtn"
          onClick={() => setShowAddUser(true)}
        >
          <i className="ri-user-add-line"></i>
          Ajouter un utilisateur
        </button>
      </div>

      {/* ADD USER MODAL */}

      {showAddUser && <AddUser onClose={() => setShowAddUser(false)} />}

      {/* FILTERS */}

      <div className="usersFilters">
        <div className="usersSearch">
          <i className="ri-search-line"></i>

          <input
            type="text"
            placeholder="Rechercher un utilisateur..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="all">Tous les rôles</option>
          <option value="admin">Admin</option>
          <option value="artisan">Artisan</option>
          <option value="client">Client</option>
        </select>
      </div>

      {/* USERS TABLE */}

      <div className="usersTableContainer">
        <table className="usersTable">
          <thead>
            <tr>
              <th>Utilisateur</th>
              <th>Email</th>
              <th>Rôle</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td>
                    <div className="userInfo">
                      <img
                        src={
                          user.profilePicture
                            ? `http://localhost:5000/uploads/users/${user.profilePicture}`
                            : "/images/user.jpg"
                        }
                        alt={user.name}
                        className="userImage"
                      />

                      <span>{user.name}</span>
                    </div>
                  </td>

                  <td className="userEmail">{user.email}</td>

                  <td>
                    <span className={`userRole ${user.role}`}>{user.role}</span>
                  </td>

                  <td>
                    <span
                      className={`userStatus ${
                        user.isActive ? "active" : "inactive"
                      }`}
                    >
                      {user.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td>
                    <div className="userActions">
                      <button
                        type="button"
                        className="viewBtn"
                        title="Voir"
                        onClick={() =>
                          navigate(`/Dashboard/getUser/${user._id}`)
                        }
                      >
                        <i className="ri-eye-line"></i>
                      </button>

                      <button
                        type="button"
                        className="editBtn"
                        title="Modifier"
                        onClick={() =>
                          navigate(`/Dashboard/getUser/${user._id}?edit=true`)
                        }
                      >
                        <i className="ri-edit-line"></i>
                      </button>

                      <button
                        type="button"
                        className="deleteBtn"
                        title="Supprimer"
                        onClick={() => handleDeleteClick(user._id)}
                      >
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="emptyUsers">
                  <i className="ri-user-search-line"></i>
                  <p>Aucun utilisateur trouvé.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* DELETE CONFIRMATION */}

      <ConfirmDelete
        isOpen={showDeleteConfirm}
        title="Supprimer cet utilisateur ?"
        message="Cet utilisateur sera supprimé. Cette action est irréversible."
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default UsersList;
