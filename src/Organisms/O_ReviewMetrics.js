import React, { Component } from "react";
import { connect } from "../redux";
import { Path, Svg, Text as SVGText, Line } from "react-native-svg";
import { A_View, A_Text } from "chemics/Atoms";
import {
  fetchVendorReviewMetricsAction,
  fetchCustomerVendorReviewMetricsAction
} from "../redux/actions/reviews.actions";
import { getResponsiveCSSFrom8 } from "../../node_modules/chemics/utils";

class O_VendorReviewMetrics_Pre extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: {
        cleanliness: { title: "cleanliness", value: 1 },
        food_quality: { title: "food_quality", value: 5 },
        spice_factor: { title: "spice", value: 4 },
        date_factor: { title: "date_night", value: 2 },
        service_quality: { title: "service", value: 3 }
      },
      customer_reviews: {
        cleanliness: { title: "cleanliness", value: 1 },
        food_quality: { title: "food_quality", value: 2 },
        spice_factor: { title: "spice", value: 3 },
        date_factor: { title: "date_night", value: 4 },
        service_quality: { title: "service", value: 5 }
      }
    };
  }

  componentDidMount = () => {
    this.props
      .dispatch(fetchVendorReviewMetricsAction(this.props.vendor.uuid))
      .then(reviews => {
        if (!reviews) return;
        this.setState({ reviews });
      });
    this.props
      .dispatch(fetchCustomerVendorReviewMetricsAction(this.props.vendor.uuid))
      .then(reviews => {
        if (!reviews) return;
        this.setState({ customer_reviews: reviews });
      });
  };

  renderMetric = ({ review, customer_review }) => {
    // only change the circumference value if you want to change the size of the circles
    const circumference = getResponsiveCSSFrom8(300).width;
    const padding = getResponsiveCSSFrom8(10).width;
    const radius = circumference / (2 * Math.PI);
    const diameter = 2 * radius;
    const box_height = diameter + padding;
    const box_width = diameter + padding;

    const initial_x = box_width / 2;
    const initial_y = (box_height - diameter) / 2;
    const percentage = +review.value / 5;
    const stroke_length = circumference * percentage;
    let stroke_color = "grey";
    switch (percentage) {
      case 0.2:
        stroke_color = "red";
        break;
      case 0.4:
        stroke_color = "orange";
        break;
      case 0.6:
        stroke_color = "#FFEE58";
        break;
      case 0.8:
        stroke_color = "blue";
        break;
      case 1:
        stroke_color = "#4CC790";
        break;
    }

    // for metric strokes...TODO...
    // animation: progress 1s ease-out forwards;

    return (
      <A_View
        style={{
          margin: getResponsiveCSSFrom8(5).width,
          marginBottom: getResponsiveCSSFrom8(30).height,
          alignItems: "center"
        }}
        key={`review-metric-${review.title}`}
      >
        <Svg
          viewbox={`0 0 ${box_width} ${box_height}`}
          width={box_width}
          height={box_height}
        >
          <Path
            strokeWidth={3}
            stroke="#f5f0f0"
            strokeLinecap="round"
            fill="none"
            strokeDasharray={`${circumference}, ${circumference}`}
            d={`M ${initial_x} ${initial_y} a ${radius} ${radius} 0 0 1 0 ${diameter} a ${radius} ${radius} 0 0 1 0 ${-diameter}`}
          />
          <Path
            strokeWidth={3}
            stroke={stroke_color}
            strokeLinecap="round"
            fill="none"
            strokeDasharray={`${stroke_length}, ${circumference}`}
            d={`M ${initial_x} ${initial_y} a ${radius} ${radius} 0 0 1 0 ${diameter} a ${radius} ${radius} 0 0 1 0 ${-diameter}`}
          />
          <SVGText
            textAnchor="middle"
            stroke={stroke_color}
            fill={stroke_color}
            fontSize="28"
            fontWeight="bold"
            x={box_width / 2 - 10}
            y={box_height / 2}
          >
            {review.value}
          </SVGText>
          <Line
            x1={box_width / 2 - radius / 4 + 3}
            y1={box_height / 2 + radius / 4 + 3}
            x2={box_width / 2 + radius / 4 + 3}
            y2={box_height / 2 - radius / 4 + 3}
            stroke="#e4e3e3"
            strokeWidth="0.7"
          />
          <SVGText
            textAnchor="middle"
            stroke="#e4e3e3"
            fill="#e4e3e3"
            fontSize="18"
            fontWeight="100"
            x={box_width / 2 + 10}
            y={box_height / 2 + 20}
          >
            5
          </SVGText>
        </Svg>
        <A_Text strong>
          {review.title
            .split("_")
            .join(" ")
            .toUpperCase()}
        </A_Text>
        {customer_review && (
          <A_Text style={{ color: "grey" }}>
            You rated{" "}
            <A_Text strong style={{ color: "grey" }}>
              {customer_review.value}
            </A_Text>
          </A_Text>
        )}
      </A_View>
    );
  };

  render() {
    const nodes = [];
    for (let r in this.state.reviews) {
      nodes.push(
        this.renderMetric({
          review: this.state.reviews[r],
          customer_review: this.state.customer_reviews[r]
        })
      );
    }
    return (
      <A_View
        style={[
          {
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center"
          },
          this.props.containerStyles
        ]}
      >
        {nodes}
      </A_View>
    );
  }
}
const O_VendorReviewMetrics = connect()(O_VendorReviewMetrics_Pre);
export { O_VendorReviewMetrics };
