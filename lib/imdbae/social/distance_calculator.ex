defmodule Imdbae.Social.DistanceCalculator do
  @moduledoc false

  # Returns distance between two pos in KMs
  def calc_distance_between_positions(pos1, pos2) do
    {:ok, result} = GoogleMaps.distance(pos1, pos2)
    elements = Enum.at(Map.get(result, "rows"), 0)
    element = Enum.at(Map.get(elements, "elements"), 0)
    distance = Map.get(element, "distance")
    kms = Map.get(distance, "text")
    {parsed, we} = Float.parse(String.replace(kms, " km", ""))
    parsed
  end

  def close_enough(pos1, pos2, preferred_distance) do
    distance = calc_distance_between_positions(pos1, pos2)
    preferred_distance >= distance - 0.1 # minus a tenth of a km
  end
end
