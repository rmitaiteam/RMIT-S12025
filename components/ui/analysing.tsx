import React from "react";

const AnalysingAdsAnimation = ({ text = "Analysing retrieved ads" }) => {
  return (
    <div className="analysing-ads-animation">
      <style jsx>{`
        .analysing-ads-animation {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .loading-text {
          margin-top: 10px;
          font-size: 14px;
          color: #f2f2f2;
        }

        @-webkit-keyframes animate-svg-stroke-1 {
          0% {
            stroke-dashoffset: 14.333399772644043px;
            stroke-dasharray: 14.333399772644043px;
          }

          100% {
            stroke-dashoffset: 0;
            stroke-dasharray: 14.333399772644043px;
          }
        }

        @keyframes animate-svg-stroke-1 {
          0% {
            stroke-dashoffset: 14.333399772644043px;
            stroke-dasharray: 14.333399772644043px;
          }

          100% {
            stroke-dashoffset: 0;
            stroke-dasharray: 14.333399772644043px;
          }
        }

        .svg-elem-1 {
          -webkit-animation: animate-svg-stroke-1 1s
              cubic-bezier(0.47, 0, 0.745, 0.715) 0s both,
            animate-svg-fill-1 0.7s cubic-bezier(0.47, 0, 0.745, 0.715) 0.8s
              both;
          animation: animate-svg-stroke-1 1s cubic-bezier(0.47, 0, 0.745, 0.715)
              0s both,
            animate-svg-fill-1 0.7s cubic-bezier(0.47, 0, 0.745, 0.715) 0.8s
              both;
        }

        @-webkit-keyframes animate-svg-stroke-2 {
          0% {
            stroke-dashoffset: 11.25px;
            stroke-dasharray: 11.25px;
          }

          100% {
            stroke-dashoffset: 0;
            stroke-dasharray: 11.25px;
          }
        }

        @keyframes animate-svg-stroke-2 {
          0% {
            stroke-dashoffset: 11.25px;
            stroke-dasharray: 11.25px;
          }

          100% {
            stroke-dashoffset: 0;
            stroke-dasharray: 11.25px;
          }
        }

        .svg-elem-2 {
          -webkit-animation: animate-svg-stroke-2 1s
              cubic-bezier(0.47, 0, 0.745, 0.715) 0.12s both,
            animate-svg-fill-2 0.7s cubic-bezier(0.47, 0, 0.745, 0.715) 0.9s
              both;
          animation: animate-svg-stroke-2 1s cubic-bezier(0.47, 0, 0.745, 0.715)
              0.12s both,
            animate-svg-fill-2 0.7s cubic-bezier(0.47, 0, 0.745, 0.715) 0.9s
              both;
        }

        @-webkit-keyframes animate-svg-stroke-3 {
          0% {
            stroke-dashoffset: 6.624599456787109px;
            stroke-dasharray: 6.624599456787109px;
          }

          100% {
            stroke-dashoffset: 0;
            stroke-dasharray: 6.624599456787109px;
          }
        }

        @keyframes animate-svg-stroke-3 {
          0% {
            stroke-dashoffset: 6.624599456787109px;
            stroke-dasharray: 6.624599456787109px;
          }

          100% {
            stroke-dashoffset: 0;
            stroke-dasharray: 6.624599456787109px;
          }
        }

        .svg-elem-3 {
          -webkit-animation: animate-svg-stroke-3 1s
              cubic-bezier(0.47, 0, 0.745, 0.715) 0.24s both,
            animate-svg-fill-3 0.7s cubic-bezier(0.47, 0, 0.745, 0.715) 1s both;
          animation: animate-svg-stroke-3 1s cubic-bezier(0.47, 0, 0.745, 0.715)
              0.24s both,
            animate-svg-fill-3 0.7s cubic-bezier(0.47, 0, 0.745, 0.715) 1s both;
        }

        @-webkit-keyframes animate-svg-stroke-4 {
          0% {
            stroke-dashoffset: 77.51058197021484px;
            stroke-dasharray: 77.51058197021484px;
          }

          100% {
            stroke-dashoffset: 0;
            stroke-dasharray: 77.51058197021484px;
          }
        }

        @keyframes animate-svg-stroke-4 {
          0% {
            stroke-dashoffset: 77.51058197021484px;
            stroke-dasharray: 77.51058197021484px;
          }

          100% {
            stroke-dashoffset: 0;
            stroke-dasharray: 77.51058197021484px;
          }
        }

        .svg-elem-4 {
          -webkit-animation: animate-svg-stroke-4 1s
              cubic-bezier(0.47, 0, 0.745, 0.715) 0.36s both,
            animate-svg-fill-4 0.7s cubic-bezier(0.47, 0, 0.745, 0.715) 1.1s
              both;
          animation: animate-svg-stroke-4 1s cubic-bezier(0.47, 0, 0.745, 0.715)
              0.36s both,
            animate-svg-fill-4 0.7s cubic-bezier(0.47, 0, 0.745, 0.715) 1.1s
              both;
        }

        @-webkit-keyframes animate-svg-stroke-5 {
          0% {
            stroke-dashoffset: 46.54561233520508px;
            stroke-dasharray: 46.54561233520508px;
          }

          100% {
            stroke-dashoffset: 0;
            stroke-dasharray: 46.54561233520508px;
          }
        }

        @keyframes animate-svg-stroke-5 {
          0% {
            stroke-dashoffset: 46.54561233520508px;
            stroke-dasharray: 46.54561233520508px;
          }

          100% {
            stroke-dashoffset: 0;
            stroke-dasharray: 46.54561233520508px;
          }
        }

        @-webkit-keyframes animate-svg-fill-5 {
          0% {
            fill: transparent;
          }

          100% {
            fill: rgb(255, 66, 89);
          }
        }

        @keyframes animate-svg-fill-5 {
          0% {
            fill: transparent;
          }

          100% {
            fill: rgb(255, 66, 89);
          }
        }

        .svg-elem-5 {
          -webkit-animation: animate-svg-stroke-5 1s
              cubic-bezier(0.47, 0, 0.745, 0.715) 0.48s both,
            animate-svg-fill-5 0.7s cubic-bezier(0.47, 0, 0.745, 0.715)
              1.2000000000000002s both;
          animation: animate-svg-stroke-5 1s cubic-bezier(0.47, 0, 0.745, 0.715)
              0.48s both,
            animate-svg-fill-5 0.7s cubic-bezier(0.47, 0, 0.745, 0.715)
              1.2000000000000002s both;
        }
      `}</style>
      <svg
        width="32"
        height="31"
        viewBox="0 0 32 31"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.9375 11.5621L7.9375 23.8955"
          stroke="#FF4259"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="svg-elem-1"
        ></path>
        <path
          d="M13.7188 14.6455L13.7187 23.8955"
          stroke="#FF4259"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="svg-elem-2"
        ></path>
        <path
          d="M19.5 19.2708L19.5 23.8954"
          stroke="#FF4259"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="svg-elem-3"
        ></path>
        <path
          d="M26.4375 14.5977V25.8125C26.4375 27.5211 25.0524 28.9062 23.3437 28.9062H4.09375C2.38512 28.9062 1 27.5211 1 25.8125V6.5625C1 4.85387 2.38512 3.46875 4.09375 3.46875H15.3086"
          stroke="#F2F2F2"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="svg-elem-4"
        ></path>
        <path
          d="M23.6019 10.734L22.2346 14.9011C22.1008 15.3088 21.5242 15.3088 21.3904 14.9011L20.0231 10.734C19.8909 10.3312 19.575 10.0153 19.1723 9.88319L15.0051 8.51584C14.5975 8.38208 14.5975 7.80542 15.0051 7.67166L19.1723 6.30431C19.575 6.17216 19.8909 5.85629 20.0231 5.45354L21.3904 1.28637C21.5242 0.878723 22.1008 0.878722 22.2346 1.28637L23.6019 5.45354C23.7341 5.85629 24.05 6.17216 24.4527 6.30431L28.6199 7.67166C29.0275 7.80542 29.0275 8.38208 28.6199 8.51584L24.4527 9.88319C24.05 10.0153 23.7341 10.3312 23.6019 10.734Z"
          fill="#FF4259"
          className="svg-elem-5"
        ></path>
      </svg>
      <div className="loading-text">{text}</div>
    </div>
  );
};

export default AnalysingAdsAnimation;
