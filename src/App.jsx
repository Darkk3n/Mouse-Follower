import { useEffect, useState } from "react";
import "./App.css";

const FollowMouse = () => {
	const [enabled, setEnabled] = useState(false);
	const [position, setPosition] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const handleMove = (event) => {
			const { clientX, clientY } = event;
			setPosition({ x: clientX, y: clientY });
		};
		if (enabled) {
			window.addEventListener("pointermove", handleMove);
		}

		//cleanup
		//cuando el componente se desmonta
		//y cuando cambian las depedencias
		//antes de ejecutar el efecto de nuevo
		return () => {
			window.removeEventListener("pointermove", handleMove);
		};
	}, [enabled]);
	return (
		<>
			<div
				style={{
					position: "absolute",
					backgroundColor: "#09f",
					borderRadius: "50%",
					opacity: 0.8,
					pointerEvents: "none",
					left: -25,
					top: -25,
					width: 50,
					height: 50,
					transform: `translate(${position.x}px,${position.y}px)`,
				}}
			></div>
			<button onClick={() => setEnabled(!enabled)}>
				{enabled ? "Desactivar" : "Activar"} Seguir Puntero
			</button>
		</>
	);
};

function App() {
	return (
		<main>
			<FollowMouse />
		</main>
	);
}

export default App;
