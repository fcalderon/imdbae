defmodule ImdbaeWeb.UserJsonController do
  use ImdbaeWeb, :controller

  alias Imdbae.Accounts
  alias Imdbae.Accounts.User

  action_fallback ImdbaeWeb.FallbackController

  def index(conn, _params) do
    if (Map.has_key?(Map.get(conn, :assigns), :authenticated_user_id)) do
      users = Accounts.list_users()
      render(conn, "index.json", users: users)
    else
      conn
      |> send_resp(:unauthorized, "Must be logged in to access this resource")
    end
  end

  """
  def create(conn, %{"user" => user_params}) do
    with {:ok, %User{} = user} <- Accounts.create_user(user_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", user_path(conn, :show, user))
      |> render("show.json", user: user)
    end
  end
  """

  def create(conn, %{"user" => user_params}) do
    case Accounts.create_user(user_params) do
      {:ok, %User{} = user} ->
        IO.inspect(user)
        conn
          |> put_status(:created)
          |> put_resp_header("location", user_path(conn, :show, user))
          |> render("show.json", user: user)
      {:error, changeset} ->
        IO.puts "Hit error in create"
        render(conn |> put_status(422), "error.json", changeset: changeset)
    end
  end


  def show(conn, %{"id" => id}) do
    if (Map.has_key?(Map.get(conn, :assigns), :authenticated_user_id)) do
      user = Accounts.get_user!(id)
      render(conn, "show.json", user: user)
    else
      conn
      |> send_resp(:unauthorized, "Must be logged in to access this resource")
    end
  end

  def update(conn, %{"id" => id, "user" => user_params}) do
    if (Map.has_key?(Map.get(conn, :assigns), :authenticated_user_id)) do
      user = Accounts.get_user!(id)

      with {:ok, %User{} = user} <- Accounts.update_user(user, user_params) do
        render(conn, "show.json", user: user)
      end
    else
      conn
      |> send_resp(:unauthorized, "Must be logged in to access this resource")
    end
  end

  def delete(conn, %{"id" => id}) do
    if (Map.has_key?(Map.get(conn, :assigns), :authenticated_user_id)) do
      user = Accounts.get_user!(id)
      with {:ok, %User{}} <- Accounts.delete_user(user) do
        send_resp(conn, :no_content, "")
      end
    else
      conn
      |> send_resp(:unauthorized, "Must be logged in to access this resource")
    end
  end
end
