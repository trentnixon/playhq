import Link from "next/link";
import { P } from "../Members/Common/Type";

export const ProductCard = ({
  product,
  signUp,
  BTN = null,
  className,
  timing,
  isActive,
}) => {
  //console.log(product);
  return (
    <div className={`${className} col-lg-4 col-md-6`}>
      <div
        className="pricing-table active-plan"
        data-aos="fade-up"
        data-aos-duration="1500"
        data-aos-delay={timing * 200}
      >
        <div className="pricing-header">
          <h3>{product.Name}</h3>
        </div>

        <div className="price">
          <span>
            <sup>$</sup>
            {product.price}
            <span>/Weekly</span>
          </span>
        </div>

        <div className="pricing-features">
          <ul>
            <li className="active">
              10 video options covering various grades and games
            </li>
            <li className="active">
              Up to 44* customized images generated per weekend
            </li>
            <li className="active">
              AI-generated match reports, summaries, posts, and emails for all
              games
            </li>
            <li className="active">
              Customization with your club&lsquo;s colors and branding
            </li>
            <li className="active">
              Option to include title sponsors in your assets
            </li>
          </ul>
        </div>

        {isActive ? (
          <P textAlign={"center"} Copy={`Active Plan`} Weight={900} color={5} />
        ) : (
          <div className="pricing-footer">
            {signUp ? (
              <Link href="/SignUp/">
                <a className="btn btn-primary">Sign up</a>
              </Link>
            ) : (
              BTN
            )}
          </div>
        )}
      </div>
    </div>
  );
};
