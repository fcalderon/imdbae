defmodule Imdbae.DistanceCalculatorTest do
  use ExUnit.Case
  @moduledoc false
  alias Imdbae.Social.DistanceCalculator

  describe "DistanceCalculator" do
    @snell {42.338484, -71.088111} # Snell's coords (Google Maps) 42.338484, -71.088111
    @mfa   {42.339478, -71.094075} # MFA 42.339478, -71.094075

    @td %{lon: -71.062204, lat: 42.366579} # TD Garden 42.366579, -71.062204
    @vincents %{lon: -71.060996, lat: 42.195600} # Vincents Asian Bistro 42.195600, -71.060996

    test "distance between snell and mfa about 0.5km" do
      distance = DistanceCalculator.calc_distance_between_positions(@snell, @mfa)
      IO.inspect("Distance between snell and mfa")
      IO.inspect(distance)
      assert 0.6 == distance
    end

    test "close enough" do
      assert DistanceCalculator.close_enough(@snell, @mfa, 0.5)
    end
  end


end
