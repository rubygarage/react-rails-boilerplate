curr = {
  priority:            1,
  iso_code:            "USD",
  iso_numeric:         "840",
  name:                "United States Dollar",
  symbol:              "$",
  subunit:             "Cent",
  subunit_to_unit:     1,
  decimal_mark:        ".",
  thousands_separator: ","
}

Money::Currency.register(curr)
