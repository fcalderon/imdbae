defmodule Imdbae.SocialTest do
  use Imdbae.DataCase

  alias Imdbae.Social

  describe "matches" do
    alias Imdbae.Social.Match

    @valid_attrs %{email1: "some email1", email2: "some email2"}
    @update_attrs %{email1: "some updated email1", email2: "some updated email2"}
    @invalid_attrs %{email1: nil, email2: nil}

    def match_fixture(attrs \\ %{}) do
      {:ok, match} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Social.create_match()

      match
    end

    test "list_matches/0 returns all matches" do
      match = match_fixture()
      assert Social.list_matches() == [match]
    end

    test "get_match!/1 returns the match with given id" do
      match = match_fixture()
      assert Social.get_match!(match.id) == match
    end

    test "create_match/1 with valid data creates a match" do
      assert {:ok, %Match{} = match} = Social.create_match(@valid_attrs)
      assert match.email1 == "some email1"
      assert match.email2 == "some email2"
    end

    test "create_match/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Social.create_match(@invalid_attrs)
    end

    test "update_match/2 with valid data updates the match" do
      match = match_fixture()
      assert {:ok, match} = Social.update_match(match, @update_attrs)
      assert %Match{} = match
      assert match.email1 == "some updated email1"
      assert match.email2 == "some updated email2"
    end

    test "update_match/2 with invalid data returns error changeset" do
      match = match_fixture()
      assert {:error, %Ecto.Changeset{}} = Social.update_match(match, @invalid_attrs)
      assert match == Social.get_match!(match.id)
    end

    test "delete_match/1 deletes the match" do
      match = match_fixture()
      assert {:ok, %Match{}} = Social.delete_match(match)
      assert_raise Ecto.NoResultsError, fn -> Social.get_match!(match.id) end
    end

    test "change_match/1 returns a match changeset" do
      match = match_fixture()
      assert %Ecto.Changeset{} = Social.change_match(match)
    end
  end
end
