import { SVGProps } from "react";

export const Icons = {
    submit: (props: SVGProps<SVGSVGElement>) => {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                {...props}
            >
                <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M21.047 22.013c.654-.685.94-1.768.473-2.816l-7.363-16.51a2.338 2.338 0 0 0-4.315 0L2.48 19.197a2.55 2.55 0 0 0 .473 2.816c.659.69 1.735 1.009 2.767.458l-.353-.662l.353.662l5.904-3.152l-.354-.662l.354.662a.79.79 0 0 1 .752 0l5.904 3.152l.353-.662l-.353.662c1.032.55 2.108.232 2.767-.458m-2.06-.866l-.351.657zl-5.904-3.152a2.29 2.29 0 0 0-2.165 0l-5.903 3.152c-.356.19-.715.103-.976-.171a1.05 1.05 0 0 1-.188-1.169l7.362-16.51c.326-.73 1.25-.73 1.575 0l7.363 16.51c.2.448.08.889-.188 1.169c-.262.274-.62.36-.976.17"
                    clipRule="evenodd"
                ></path>
            </svg>
        );
    },
    bot: (props: SVGProps<SVGSVGElement>) => {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                {...props}
            >
                <path
                    fill="white"
                    d="m16.15 14.4l2.56 7.86L12 17.4l-6.72 4.9l2.57-7.93l-6.7-4.87h8.29L12 1.61l2.56 7.89h8.33zm-2.85 2.07l2.56 1.86l-.98-3.01zM11 9.5h2l-1-3.03zm-.26 6.97L9.13 15.3l-1 3.07zM18.28 11h-3.23l.62 1.9zm-7.75 0l-.91 2.8L12 15.54l2.39-1.72l-.92-2.82zm-4.77 0l2.58 1.87l.61-1.87z"
                ></path>
            </svg>
        );
    },
    github: (props: SVGProps<SVGSVGElement>) => {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                {...props}
            >
                <path
                    fill="currentColor"
                    d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"
                ></path>
            </svg>
        );
    },
    user: ({
        height = "1em",
        width = "1em",
        fill = "currentColor",
        ...props
    }: SVGProps<SVGSVGElement>) => {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={width}
                height={height}
                viewBox="0 0 256 256"
                {...props}
            >
                <path
                    fill={fill}
                    d="M227.46 214c-16.52-28.56-43-48.06-73.68-55.09a68 68 0 1 0-51.56 0c-30.64 7-57.16 26.53-73.68 55.09a4 4 0 0 0 6.92 4C55 184.19 89.62 164 128 164s73 20.19 92.54 54a4 4 0 0 0 3.46 2a3.93 3.93 0 0 0 2-.54a4 4 0 0 0 1.46-5.46ZM68 96a60 60 0 1 1 60 60a60.07 60.07 0 0 1-60-60Z"
                ></path>
            </svg>
        );
    },
    externalLink: (props: SVGProps<SVGSVGElement>) => {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                {...props}
            >
                <path
                    fill="currentColor"
                    d="M10 6v2H5v11h11v-5h2v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1zm11-3v9l-3.794-3.793l-5.999 6l-1.414-1.414l5.999-6L12 3z"
                ></path>
            </svg>
        );
    },
    stop: ({
        width = "1em",
        height = "1em",
        fill = "currentColor",
        ...props
    }: SVGProps<SVGSVGElement>) => {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={width}
                height={height}
                viewBox="0 0 20 20"
                {...props}
            >
                <path
                    fill={fill}
                    d="M15.5 4a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5h11Zm-11-1A1.5 1.5 0 0 0 3 4.5v11A1.5 1.5 0 0 0 4.5 17h11a1.5 1.5 0 0 0 1.5-1.5v-11A1.5 1.5 0 0 0 15.5 3h-11Z"
                ></path>
            </svg>
        );
    },
    reload: ({
        width = "1em",
        height = "1em",
        fill = "none",
        ...props
    }: SVGProps<SVGSVGElement>) => {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={width}
                height={height}
                viewBox="0 0 21 21"
                {...props}
            >
                <g
                    fill={fill}
                    fillRule="evenodd"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M6.5 3.5c-2.414 1.377-4 4.022-4 7a8 8 0 1 0 8-8"></path>
                    <path d="M6.5 7.5v-4h-4"></path>
                </g>
            </svg>
        );
    },
    loading: (props: SVGProps<SVGSVGElement>) => {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                {...props}
            >
                <path
                    fill="currentColor"
                    d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z"
                    opacity=".5"
                ></path>
                <path
                    fill="currentColor"
                    d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z"
                >
                    <animateTransform
                        attributeName="transform"
                        dur="1s"
                        from="0 12 12"
                        repeatCount="indefinite"
                        to="360 12 12"
                        type="rotate"
                    ></animateTransform>
                </path>
            </svg>
        );
    },
    copy: (props: SVGProps<SVGSVGElement>) => {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                {...props}
            >
                <g fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M6 11c0-2.828 0-4.243.879-5.121C7.757 5 9.172 5 12 5h3c2.828 0 4.243 0 5.121.879C21 6.757 21 8.172 21 11v5c0 2.828 0 4.243-.879 5.121C19.243 22 17.828 22 15 22h-3c-2.828 0-4.243 0-5.121-.879C6 20.243 6 18.828 6 16z"></path>
                    <path
                        d="M6 19a3 3 0 0 1-3-3v-6c0-3.771 0-5.657 1.172-6.828S7.229 2 11 2h4a3 3 0 0 1 3 3"
                        opacity=".5"
                    ></path>
                </g>
            </svg>
        );
    },
    checkmark: (props: SVGProps<SVGSVGElement>) => {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                {...props}
            >
                <path
                    fill="currentColor"
                    d="m9 19.414l-6.707-6.707l1.414-1.414L9 16.586L20.293 5.293l1.414 1.414z"
                ></path>
            </svg>
        );
    },
    sidebar: (props: SVGProps<SVGSVGElement>) => {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                {...props}
            >
                <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M2 12c0-3.69 0-5.534.814-6.841a4.8 4.8 0 0 1 1.105-1.243C5.08 3 6.72 3 10 3h4c3.28 0 4.919 0 6.081.916c.43.338.804.759 1.105 1.243C22 6.466 22 8.31 22 12s0 5.534-.814 6.841a4.8 4.8 0 0 1-1.105 1.243C18.92 21 17.28 21 14 21h-4c-3.28 0-4.919 0-6.081-.916a4.8 4.8 0 0 1-1.105-1.243C2 17.534 2 15.69 2 12m7.5-9v18M5 7h1m-1 3h1"
                    color="currentColor"
                ></path>
            </svg>
        );
    },
};
