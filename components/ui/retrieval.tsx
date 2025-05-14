import React from "react";

const RetrievalLoadingAnimation = ({
  text = "Retrieving ads for reference",
}) => {
  return (
    <div className="loading-animation">
      <style jsx>{`
        .loading-animation {
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
            stroke-dashoffset: 27.80762481689453px;
            stroke-dasharray: 27.80762481689453px;
          }
          100% {
            stroke-dashoffset: 0;
            stroke-dasharray: 27.80762481689453px;
          }
        }
        @keyframes animate-svg-stroke-1 {
          0% {
            stroke-dashoffset: 27.80762481689453px;
            stroke-dasharray: 27.80762481689453px;
          }
          100% {
            stroke-dashoffset: 0;
            stroke-dasharray: 27.80762481689453px;
          }
        }
        @-webkit-keyframes animate-svg-fill-1 {
          0% {
            fill: transparent;
          }
          100% {
            fill: rgb(244, 192, 10);
          }
        }
        @keyframes animate-svg-fill-1 {
          0% {
            fill: transparent;
          }
          100% {
            fill: rgb(244, 192, 10);
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
            stroke-dashoffset: 27.062095642089844px;
            stroke-dasharray: 27.062095642089844px;
          }
          100% {
            stroke-dashoffset: 0;
            stroke-dasharray: 27.062095642089844px;
          }
        }
        @keyframes animate-svg-stroke-2 {
          0% {
            stroke-dashoffset: 27.062095642089844px;
            stroke-dasharray: 27.062095642089844px;
          }
          100% {
            stroke-dashoffset: 0;
            stroke-dasharray: 27.062095642089844px;
          }
        }
        @-webkit-keyframes animate-svg-fill-2 {
          0% {
            fill: transparent;
          }
          100% {
            fill: rgb(244, 192, 10);
          }
        }
        @keyframes animate-svg-fill-2 {
          0% {
            fill: transparent;
          }
          100% {
            fill: rgb(244, 192, 10);
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
            stroke-dashoffset: 62.89783477783203px;
            stroke-dasharray: 62.89783477783203px;
          }
          100% {
            stroke-dashoffset: 0;
            stroke-dasharray: 62.89783477783203px;
          }
        }
        @keyframes animate-svg-stroke-3 {
          0% {
            stroke-dashoffset: 62.89783477783203px;
            stroke-dasharray: 62.89783477783203px;
          }
          100% {
            stroke-dashoffset: 0;
            stroke-dasharray: 62.89783477783203px;
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
            stroke-dashoffset: 12.48497486114502px;
            stroke-dasharray: 12.48497486114502px;
          }
          100% {
            stroke-dashoffset: 0;
            stroke-dasharray: 12.48497486114502px;
          }
        }
        @keyframes animate-svg-stroke-4 {
          0% {
            stroke-dashoffset: 12.48497486114502px;
            stroke-dasharray: 12.48497486114502px;
          }
          100% {
            stroke-dashoffset: 0;
            stroke-dasharray: 12.48497486114502px;
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
      `}</style>
      <svg
        width="32"
        height="31"
        viewBox="0 0 32 31"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.0341 14.908L15.2774 17.3149C15.1967 17.5716 14.8334 17.5716 14.7527 17.3149L13.9961 14.908C13.9174 14.6578 13.7245 14.4599 13.4764 14.375L11.1439 13.5762C10.8961 13.4913 10.8961 13.1407 11.1439 13.0558L13.4764 12.257C13.7245 12.1721 13.9174 11.9742 13.9961 11.724L14.7527 9.31715C14.8334 9.06045 15.1967 9.06045 15.2774 9.31715L16.0341 11.724C16.1127 11.9742 16.3057 12.1721 16.5538 12.257L18.8862 13.0558C19.1341 13.1407 19.1341 13.4913 18.8862 13.5762L16.5538 14.375C16.3057 14.4599 16.1127 14.6578 16.0341 14.908Z"
          fill="#F4C00A"
          className="svg-elem-1"
        ></path>
        <path
          d="M5.80956 6.95711L5.02873 9.18325C4.94269 9.42855 4.59578 9.42855 4.50973 9.18325L3.72891 6.95711C3.64216 6.70979 3.44305 6.51841 3.1925 6.4415L0.856455 5.72443C0.597384 5.64491 0.597384 5.27817 0.856455 5.19865L3.1925 4.48159C3.44305 4.40468 3.64216 4.21329 3.72891 3.96597L4.50973 1.73983C4.59578 1.49453 4.94269 1.49453 5.02873 1.73983L5.80956 3.96597C5.89631 4.21329 6.09541 4.40468 6.34597 4.48159L8.68201 5.19865C8.94108 5.27817 8.94108 5.64491 8.68201 5.72443L6.34597 6.4415C6.09541 6.51841 5.89631 6.70979 5.80956 6.95711Z"
          fill="#F4C00A"
          className="svg-elem-2"
        ></path>
        <path
          d="M3.51221 13.6628C3.51221 20.4849 8.81091 26.0153 15.3472 26.0153C21.8835 26.0153 27.1822 20.4849 27.1822 13.6628C27.1822 6.84062 21.8835 1.31018 15.3472 1.31018C14.0114 1.31018 12.7272 1.54117 11.5295 1.96697"
          stroke="#F2F2F2"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="svg-elem-3"
        ></path>
        <path
          d="M30.9998 30.0001L26.4907 25.2939L23.7461 22.4292"
          stroke="#F2F2F2"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="svg-elem-4"
        ></path>
      </svg>
      <div className="loading-text">{text}</div>
    </div>
  );
};

export default RetrievalLoadingAnimation;
