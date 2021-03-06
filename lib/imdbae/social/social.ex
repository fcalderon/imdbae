defmodule Imdbae.Social do
  @moduledoc """
  The Social context.
  """

  import Ecto.Query, warn: false
  alias Imdbae.Repo

  alias Imdbae.Social.Match

  @doc """
  Returns the list of matches.

  ## Examples

      iex> list_matches()
      [%Match{}, ...]

  """
  def list_matches do
    Repo.all(Match)
  end

  def list_matches_by_first_user_id(userId) do
    Repo.all(from match in Match, where: match.first_user_id == ^userId)
    |> Repo.preload(:first_user)
    |> Repo.preload(:second_user)
  end

  def list_matches_by_first_and_second_user_id(firstUserId, secondUserId) do
    Repo.all(from match in Match, where: match.first_user_id == ^firstUserId and match.second_user_id == ^secondUserId)
    |> Repo.preload(:first_user)
    |> Repo.preload(:second_user)
  end

  def list_matches_by_first_user_id_and_movie_id(userId, movieId) do
    Repo.all(
      from match in Match,
      where: match.matched_on_movie_id == ^movieId and (match.first_user_id == ^userId
                                                        or match.second_user_id == ^userId)
    )
    |> Repo.preload(:first_user)
    |> Repo.preload(:second_user)
  end

  @doc """
  Gets a single match.

  Raises `Ecto.NoResultsError` if the Match does not exist.

  ## Examples

      iex> get_match!(123)
      %Match{}

      iex> get_match!(456)
      ** (Ecto.NoResultsError)

  """
  def get_match!(id), do: Repo.get!(Match, id)

  @doc """
  Creates a match.

  ## Examples

      iex> create_match(%{field: value})
      {:ok, %Match{}}

      iex> create_match(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_match(attrs \\ %{}) do
    %Match{}
    |> Match.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a match.

  ## Examples

      iex> update_match(match, %{field: new_value})
      {:ok, %Match{}}

      iex> update_match(match, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_match(%Match{} = match, attrs) do
    match
    |> Match.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Match.

  ## Examples

      iex> delete_match(match)
      {:ok, %Match{}}

      iex> delete_match(match)
      {:error, %Ecto.Changeset{}}

  """
  def delete_match(%Match{} = match) do
    Repo.delete(match)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking match changes.

  ## Examples

      iex> change_match(match)
      %Ecto.Changeset{source: %Match{}}

  """
  def change_match(%Match{} = match) do
    Match.changeset(match, %{})
  end
end
