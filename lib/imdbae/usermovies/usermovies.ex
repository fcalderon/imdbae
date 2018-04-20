defmodule Imdbae.Usermovies do
  @moduledoc """
  The Usermovies context.
  """

  import Ecto.Query, warn: false
  alias Imdbae.Repo

  alias Imdbae.Usermovies.Usermovie

  @doc """
  Returns the list of usermovies.

  ## Examples

      iex> list_usermovies()
      [%Usermovie{}, ...]

  """
  def list_usermovies do
    Repo.all(Usermovie)
  end

  def list_usermovies_by_user_id(userId) do
    Repo.all(from m in Usermovie, where: m.user_id == ^userId)
  end

  def list_usermovies_by_movie_id(movie_id) do
    Repo.all(from m in Usermovie, where: m.movie_id == ^movie_id)
  end

  @doc """
  Gets a single usermovie.

  Raises `Ecto.NoResultsError` if the Usermovie does not exist.

  ## Examples

      iex> get_usermovie!(123)
      %Usermovie{}

      iex> get_usermovie!(456)
      ** (Ecto.NoResultsError)

  """
  def get_usermovie!(id), do: Repo.get!(Usermovie, id)

  @doc """
  Creates a usermovie.

  ## Examples

      iex> create_usermovie(%{field: value})
      {:ok, %Usermovie{}}

      iex> create_usermovie(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_usermovie(attrs \\ %{}) do
    %Usermovie{}
    |> Usermovie.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a usermovie.

  ## Examples

      iex> update_usermovie(usermovie, %{field: new_value})
      {:ok, %Usermovie{}}

      iex> update_usermovie(usermovie, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_usermovie(%Usermovie{} = usermovie, attrs) do
    usermovie
    |> Usermovie.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Usermovie.

  ## Examples

      iex> delete_usermovie(usermovie)
      {:ok, %Usermovie{}}

      iex> delete_usermovie(usermovie)
      {:error, %Ecto.Changeset{}}

  """
  def delete_usermovie(%Usermovie{} = usermovie) do
    Repo.delete(usermovie)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking usermovie changes.

  ## Examples

      iex> change_usermovie(usermovie)
      %Ecto.Changeset{source: %Usermovie{}}

  """
  def change_usermovie(%Usermovie{} = usermovie) do
    Usermovie.changeset(usermovie, %{})
  end
end
