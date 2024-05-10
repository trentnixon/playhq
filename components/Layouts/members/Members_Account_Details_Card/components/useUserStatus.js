import {
  IconAlertTriangle,
  IconCheck,
  IconClockPause,
  IconX,
} from "@tabler/icons-react";

// Helper to calculate status based on order attributes
function getStatus(orderAttributes) {
  const { isActive, Status, OrderPaid, isExpiringSoon } = orderAttributes;

  if (!Status) {
    return {
      statusMessage: "Renew Season Pass",
      statusColor: "gray.6",
      StatusIcon: IconX,
    };
  }

  if (isActive) {
    if (OrderPaid) {
      if (isExpiringSoon) {
        return {
          statusMessage: "Expiring Soon",
          statusColor: "yellow.6",
          StatusIcon: IconClockPause,
        };
      }
      return {
        statusMessage: "Active",
        statusColor: "green.6",
        StatusIcon: IconCheck,
      };
    }
    return {
      statusMessage: "Awaiting Payment",
      statusColor: "blue.6",
      StatusIcon: IconAlertTriangle,
    };
  }
  if (OrderPaid && !isActive) {
    return {
      statusMessage: "Scheduled",
      statusColor: "yellow.6",
      StatusIcon: IconX,
    };
  }
  return {
    statusMessage: "Not Active",
    statusColor: "red.6",
    StatusIcon: IconX,
  };
}

// Helper to calculate days left
function calculateDaysLeft(endOrderAt) {
  const today = new Date();
  const endDate = new Date(endOrderAt);
  return Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
}


export function useUserStatus(user) {
  const orders = user.attributes.orders?.data ?? [];

  if (orders.length === 0) {
    return {
      statusMessage: "No Orders Found",
      statusColor: "gray.4",
      StatusIcon: IconX, // Assuming IconX is an appropriate icon for "no orders"
      daysLeft: null,
    };
  }

 // Find the most recent order by the highest ID value
 const mostRecentOrder = orders.reduce((latest, order) => {
  return parseInt(order.id) > parseInt(latest.id) ? order : latest;
}, orders[0]);

  try {
    const { createdAt, endOrderAt, startOrderAt, subscription_tier } = mostRecentOrder.attributes;
    const { statusMessage, statusColor, StatusIcon } = getStatus(mostRecentOrder.attributes);
    const { Title, DaysInPass, includeSponsors } = subscription_tier?.data?.attributes || {};
    const daysLeft = calculateDaysLeft(endOrderAt);

    return {
      createdAt: new Date(createdAt),
      statusMessage,
      statusColor,
      StatusIcon,
      Title,
      DaysInPass,
      includeSponsors,
      daysLeft,
      endOrderAt,
      startOrderAt,
    };
  } catch (error) {
    console.error("Failed to process the most recent order:", error);
    return {
      statusMessage: "Error processing the order",
      statusColor: "error",
      StatusIcon: IconError, // Assume IconError is defined elsewhere
      daysLeft: null,
    };
  }
}

/* export function useUserStatus(user) {
  const orders = user.attributes.orders?.data ?? [];
 
  console.log("orders ", orders)
  const orderStatuses = orders.map((order) => {
    const { createdAt, endOrderAt, startOrderAt, subscription_tier } =
      order.attributes;
    const { statusMessage, statusColor, StatusIcon } = getStatus(
      order.attributes
    );
    const { Title, DaysInPass, includeSponsors } =
      subscription_tier?.data?.attributes || {};
    const daysLeft = calculateDaysLeft(endOrderAt);

    return {
      createdAt: new Date(createdAt),
      statusMessage,
      statusColor,
      StatusIcon,
      Title,
      DaysInPass,
      includeSponsors,
      daysLeft,
      endOrderAt,
      startOrderAt,
    };
  });

  // Sort the statuses by most recent order
  const sortedStatuses = orderStatuses.sort(
    (a, b) => b.createdAt - a.createdAt
  );

  // Pick the most recent order's status to display
  return sortedStatuses.length
    ? sortedStatuses[0]
    : {
        statusMessage: "No Orders Found",
        statusColor: "gray.4",
        StatusIcon: IconX,
        daysLeft: null,
      };
} */

/*
{
    "createdAt": "2024-04-23T01:20:23.385Z",
    "updatedAt": "2024-04-23T01:20:47.314Z",
    "isActive": true,
    "Name": "EtaxADXMmE",
    "checkout_session": null,
    "stripe_expires_at": null,
    "stripe_status": null,
    "stripe_subscription_id": null,
    "stripe_customer_id": "cus_Px1INGpuPKhIpy",
    "Status": true,
    "payment_method": null,
    "stripe_invoice": null,
    "total": "59900",
    "currency": "aud",
    "payment_method_types": null,
    "payment_status": "paid",
    "checkout_status": "incomplete",
    "cancel_url": null,
    "strapi_created": null,
    "cancel_at_period_end": false,
    "cancel_at": null,
    "Fixture_start": null,
    "Fixture_end": null,
    "isPaused": false,
    "invoice_created": "1713835222",
    "invoice_due_date": "1716427222",
    "hosted_invoice_url": "https://invoice.stripe.com/i/acct_1MJZLQB8WHIxKuGR/test_YWNjdF8xTUpaTFFCOFdISXhLdUdSLF9QeVYyZmxYc1p4eWlIWFFEZ0lqS0Zncm1sYW43NHNMLDEwNDM3NjAyNQ0200hW8DuIXV?s=ap",
    "invoice_pdf": "https://pay.stripe.com/invoice/acct_1MJZLQB8WHIxKuGR/test_YWNjdF8xTUpaTFFCOFdISXhLdUdSLF9QeVYyZmxYc1p4eWlIWFFEZ0lqS0Zncm1sYW43NHNMLDEwNDM3NjAyNQ0200hW8DuIXV/pdf?s=ap",
    "invoice_id": "in_1P8Y1yB8WHIxKuGRLuf9w9Ih",
    "invoice_number": "39038FA1-0018",
    "payment_intent": "pi_3P8Y20B8WHIxKuGR05qxzMRL",
    "startOrderAt": "2024-04-22",
    "OrderPaid": true,
    "endOrderAt": "2025-04-23",
    "expireEmailSent": false,
    "hasOrderExpired": false,
    "expiringSoonEmail": false,
    "isExpiringSoon": false,
    "subscription_tier": {
        "data": {
            "id": 12,
            "attributes": {
                "Name": "Season Pass",
                "createdAt": "2024-04-16T00:30:00.547Z",
                "updatedAt": "2024-04-16T01:19:47.148Z",
                "publishedAt": "2024-04-16T00:34:50.686Z",
                "description": "Go all in for a full year of comprehensive support with our 180-day pass, renewable for a seamless annual solution. Covering everything from detailed match summaries to engaging player profiles, this pass ensures your club remains in the spotlight throughout the entire season.",
                "price": 599,
                "currency": "AUD",
                "stripe_product_id": "prod_PvriCasbdcnPxD",
                "stripe_price_id": "price_1P5zynB8WHIxKuGRCdSyEpwo",
                "isActive": true,
                "isClub": true,
                "subscription_items": {
                    "name": "Club Captain",
                    "items": [
                        {
                            "category": "AI-generated Write-ups",
                            "icon": "IconNews",
                            "details": [
                                {
                                    "type": "Upcoming Fixtures Write-ups",
                                    "description": "Provides an enticing tweet, a comprehensive overview, and a deep dive analysis for each upcoming match. It sets the stage and gets everyone ready for the game.",
                                    "hasOption": true
                                },
                                {
                                    "type": "Results Write-ups",
                                    "description": "Delivers a quick update tweet capturing the result and highlights of each game, followed by a detailed summary and an exhaustive deep dive analysis, reliving every moment.",
                                    "hasOption": true
                                },
                                {
                                    "type": "Weekend Stats summary",
                                    "description": "A detailed report of the team's performance over the weekend, bringing light to the top performers and significant achievements",
                                    "hasOption": true
                                },
                                {
                                    "type": "Top 5 Batting Performances",
                                    "description": "Highlighting individual brilliance with the bat",
                                    "hasOption": true
                                },
                                {
                                    "type": "Top 5 Bowling Performances",
                                    "description": "Showcasing outstanding feats with the ball",
                                    "hasOption": true
                                }
                            ]
                        },
                        {
                            "category": "Tailored Videos",
                            "icon": "IconVideo",
                            "details": [
                                {
                                    "type": "Weekly fixture videos",
                                    "description": "Customized 4:5 videos outlining all upcoming matches for the next seven days",
                                    "hasOption": true
                                },
                                {
                                    "type": "Weekend results videos",
                                    "description": "Detailed visual summaries of your team's performance over the past week",
                                    "hasOption": true
                                },
                                {
                                    "type": "Weekend stats videos",
                                    "description": "Visual summaries of the standout statistics and performances",
                                    "hasOption": true
                                },
                                {
                                    "type": "Team ladder videos",
                                    "description": "A regular update on your team's position in the competition",
                                    "hasOption": true
                                }
                            ]
                        },
                        {
                            "category": "High-quality Images",
                            "icon": "IconPhotoAi",
                            "details": [
                                {
                                    "type": "Pre- and Post-game Images",
                                    "description": "High-quality images derived from the videos for all pre-game and post-game updates, perfect for instant social media posts that capture the essence of each match.",
                                    "hasOption": true
                                },
                                {
                                    "type": "Statistics Visuals",
                                    "description": "Captivating images extracted from the weekend stats and team ladder videos, making for compelling quick-glance social media updates.",
                                    "hasOption": true
                                }
                            ]
                        },
                        {
                            "category": "Sponsors",
                            "icon": "IconCurrencyDollar",
                            "details": [
                                {
                                    "type": "Display Sponsors",
                                    "description": "Allows accounts to include up to 5 key sponsors in their videos, ensuring prominent display of the sponsor's logos throughout the content.",
                                    "hasOption": true
                                }
                            ]
                        }
                    ]
                },
                "includeSponsors": true,
                "Category": "Club",
                "DaysInPass": 365,
                "PriceByWeekInPass": 23,
                "Title": "Season Pass",
                "SubTitle": "6 month + 6 months free"
            }
        }
    }
}
*/
