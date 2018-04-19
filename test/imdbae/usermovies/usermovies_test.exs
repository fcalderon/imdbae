defmodule Imdbae.UsermoviesTest do
  use Imdbae.DataCase

  alias Imdbae.Usermovies

  describe "usermovies" do
    alias Imdbae.Usermovies.Usermovie

    @valid_attrs %{movie_id: 42}
    @update_attrs %{movie_id: 43}
    @invalid_attrs %{movie_id: nil}

    def usermovie_fixture(attrs \\ %{}) do
      {:ok, usermovie} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Usermovies.create_usermovie()

      usermovie
    end

    test "list_usermovies/0 returns all usermovies" do
      usermovie = usermovie_fixture()
      assert Usermovies.list_usermovies() == [usermovie]
    end

    test "get_usermovie!/1 returns the usermovie with given id" do
      usermovie = usermovie_fixture()
      assert Usermovies.get_usermovie!(usermovie.id) == usermovie
    end

    test "create_usermovie/1 with valid data creates a usermovie" do
      assert {:ok, %Usermovie{} = usermovie} = Usermovies.create_usermovie(@valid_attrs)
      assert usermovie.movie_id == 42
    end

    test "create_usermovie/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Usermovies.create_usermovie(@invalid_attrs)
    end

    test "update_usermovie/2 with valid data updates the usermovie" do
      usermovie = usermovie_fixture()
      assert {:ok, usermovie} = Usermovies.update_usermovie(usermovie, @update_attrs)
      assert %Usermovie{} = usermovie
      assert usermovie.movie_id == 43
    end

    test "update_usermovie/2 with invalid data returns error changeset" do
      usermovie = usermovie_fixture()
      assert {:error, %Ecto.Changeset{}} = Usermovies.update_usermovie(usermovie, @invalid_attrs)
      assert usermovie == Usermovies.get_usermovie!(usermovie.id)
    end

    test "delete_usermovie/1 deletes the usermovie" do
      usermovie = usermovie_fixture()
      assert {:ok, %Usermovie{}} = Usermovies.delete_usermovie(usermovie)
      assert_raise Ecto.NoResultsError, fn -> Usermovies.get_usermovie!(usermovie.id) end
    end

    test "change_usermovie/1 returns a usermovie changeset" do
      usermovie = usermovie_fixture()
      assert %Ecto.Changeset{} = Usermovies.change_usermovie(usermovie)
    end
  end
end
