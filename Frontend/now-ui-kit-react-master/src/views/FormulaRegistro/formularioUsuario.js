import React from 'react';
import {Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import Card from 'reactstrap/lib/Card';
import CardBody from 'reactstrap/lib/CardBody';
import CardTitle from 'reactstrap/lib/CardTitle';
import Col from 'reactstrap/lib/Col';
import Container from 'reactstrap/lib/Container';
import Datetime from 'react-datetime';
import InputGroup from 'reactstrap/lib/InputGroup';
import InputGroupAddon from 'reactstrap/lib/InputGroupAddon';
import InputGroupText from 'reactstrap/lib/InputGroupText';
import Row from 'reactstrap/lib/Row';


function registro(){
    return(
        <div style={{ backgroundColor: '#6A959D' }}>
            <Container> 
                <Col className="ml-auto mr-auto" md="7">
                    <Card style={{  width: "40rem",backgroundColor: '#E8F1F2'}}>
                        <CardBody>
                            <CardTitle tag="h2">Formulario de Registro</CardTitle>
                                <Form>

                                    {/* entrada para  username */}
                                    <FormGroup>
                                        <label htmlFor="exampleInputPassword1">Username</label>
                                            <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="now-ui-icons tech_controller-modern"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input placeholder="Username de Usuario" type="text"></Input>
                                            </InputGroup>                                            
                                    </FormGroup>

                                    {/* entrada para  NOmbre de suario*/}
                                    <FormGroup>
                                        <label htmlFor="exampleInputPassword1">Nombre</label>
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="now-ui-icons emoticons_satisfied"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                            placeholder="Nombre..."
                                            type="text"></Input>
                                            </InputGroup>                                        
                                    </FormGroup>


                                    {/* entrada para Apellido de usuario */}
                                    <FormGroup>
                                        <label htmlFor="exampleInputPassword1">Apellido</label>
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="now-ui-icons emoticons_satisfied"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                            placeholder="Apellido..."
                                            type="text"
                                            ></Input>
                                            </InputGroup>                                         
                                    </FormGroup>

                                    <br/>

                                    {/* fecha de nacimiento */}
                                    <Datetime
                                    inputProps={{ placeholder: "Ingrese su fecha de nacimiento" }}
                                    />

                                    <br></br>

                                    {/* entrada para  fecha de registor*/}
                                    {/* <FormGroup>
                                        <label htmlFor="exampleInputPassword1">Fecha Nacimiento</label>
                                        <Input
                                            placeholder="Username"
                                            type="date"
                                        ></Input>
                                    </FormGroup> */}
                                                        

                                    {/* correo electronico  */}
                                    <FormGroup>
                                        <label htmlFor="exampleInputEmail1">Email address</label>
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="now-ui-icons ui-1_email-85"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                            aria-describedby="emailHelp"
                                            id="exampleInputEmail1"
                                            placeholder="Ingrese su Email"
                                            type="email"
                                            ></Input>
                                            </InputGroup> 
                                        
                                    <FormText className="text-muted" color="default" id="emailHelp">
                                        We'll never share your email with anyone else.
                                    </FormText>
                                    </FormGroup>


                                    {/* entrada para  */}
                                    <FormGroup>
                                        <label htmlFor="exampleInputPassword1">Foto Perfil</label>
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="now-ui-icons emoticons_satisfied"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                            placeholder="Foto de Perfil"
                                            type="text"
                                            ></Input>
                                            </InputGroup>                                         
                                    </FormGroup>


                                    {/*  */}
                                    <FormGroup>
                                        <label htmlFor="exampleInputPassword1">Password</label>
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="now-ui-icons loader_gear"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                            id="exampleInputPassword1"
                                            placeholder="Password"
                                            type="password"
                                            ></Input>
                                            </InputGroup>                                         
                                    </FormGroup>

                                    
                                    <Button color="primary" type="submit">
                                        REGISTRAR
                                    </Button>

                                </Form>
                        </CardBody>            
                    </Card>
                </Col>
            </Container>
      </div>
    );
}


export default registro;