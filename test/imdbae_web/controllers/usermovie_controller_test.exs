defmodule ImdbaeWeb.UsermovieControllerTest do
  use ImdbaeWeb.ConnCase

  alias Imdbae.Usermovies
  alias Imdbae.Usermovies.Usermovie

  @create_attrs %{movie_id: 42}
  @update_attrs %{movie_id: 43}
  @invalid_attrs %{movie_id: nil}

  def fixture(:usermovie) do
    {:ok, usermovie} = Usermovies.create_usermovie(@create_attrs)
    usermovie
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all usermovies", %{conn: conn} do
      conn = get conn, usermovie_path(conn, :index)
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create usermovie" do
    test "renders usermovie when data is valid", %{conn: conn} do
      conn = post conn, usermovie_path(conn, :create), usermovie: @create_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, usermovie_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
               "id" => id,
               "movie_id" => 42
             }
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, usermovie_path(conn, :create), usermovie: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update usermovie" do
    setup [:create_usermovie]

    test "renders usermovie when data is valid", %{conn: conn, usermovie: %Usermovie{id: id} = usermovie} do
      conn = put conn, usermovie_path(conn, :update, usermovie), usermovie: @update_attrs
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get conn, usermovie_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
               "id" => id,
               "movie_id" => 43
             }
    end

    test "renders errors when data is invalid", %{conn: conn, usermovie: usermovie} do
      conn = put conn, usermovie_path(conn, :update, usermovie), usermovie: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete usermovie" do
    setup [:create_usermovie]

    test "deletes chosen usermovie", %{conn: conn, usermovie: usermovie} do
      conn = delete conn, usermovie_path(conn, :delete, usermovie)
      assert response(conn, 204)
      assert_error_sent 404, fn ->
        get conn, usermovie_path(conn, :show, usermovie)
      end
    end
  end

  defp create_usermovie(_) do
    usermovie = fixture(:usermovie)
    {:ok, usermovie: usermovie}
  end
end
