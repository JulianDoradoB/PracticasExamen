import { Outlet, useLocation } from "react-router-dom";
import { Container, Navbar, Nav, Dropdown } from "react-bootstrap";
import { AnimatePresence, motion } from "framer-motion";

function Layout() {
  const location = useLocation();

  return (
    <div className="d-flex flex-column vh-100">
      {/* Cabecera fija */}
      <Navbar expand="lg" bg="dark" variant="dark"> 
        <Container fluid>
          <Navbar.Brand href="#">Portafolio</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarSupportedContent" />
          <Navbar.Collapse id="navbarSupportedContent">
            <Nav className="me-auto">
              <Nav.Link href="/">Inicio</Nav.Link>
              {/* Menú desplegable con React-Bootstrap */}
              <Dropdown>
                <Dropdown.Toggle as={Nav.Link} id="dropdown-custom">
                  Prácticas 1
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="/ejercicio2">Texturas</Dropdown.Item>
                  <Dropdown.Item href="/ejercicio3">Plano y Figuras</Dropdown.Item>
                  <Dropdown.Item href="/ejercicio4">Agrupacion de Objetos - React</Dropdown.Item>
                  <Dropdown.Item href="/ejercicio5">Agrupacion de Objetos - Three.js</Dropdown.Item>
               </Dropdown.Menu>
              </Dropdown>
            
              <Dropdown>
                <Dropdown.Toggle as={Nav.Link} id="dropdown-custom">
                  Laboratorio
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="/Practica1">Practica1</Dropdown.Item>
                  <Dropdown.Item href="/Practica2">Practica2</Dropdown.Item>
                  <Dropdown.Item href="/Practica3">Practica3</Dropdown.Item>
                  <Dropdown.Item href="/Practica4">Practica4</Dropdown.Item>
                  <Dropdown.Item href="/Practica5">Practica5</Dropdown.Item>
                  <Dropdown.Item href="/Practica6">Practica6</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Contenedor de las páginas con transiciones suaves */}
      <Container
        fluid
        className="flex-grow-1 p-4"
        style={{
          backgroundColor: "black",
          color: "white",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </Container>
    </div>
  );
}

export default Layout;
