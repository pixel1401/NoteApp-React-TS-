import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useNote } from "./NoteLayout";


type NoteProps = {
    onDelete : (id:string) => void
}

export function Note({onDelete}: NoteProps ) {
    const note = useNote();
    const navigate = useNavigate();

    return <>
        <Row className="align-items-center">
            <Col>
                <h1>{note.title}</h1>
                {note.tags.length > 0 && (
                    <Stack gap={2} className="align-items-center justify-content-center h-100" >
                        {note.tags.length > 0 && (
                            <Stack gap={1} direction="horizontal" className="justify-content-center align-items-center">
                                {note.tags.map(tag => (
                                    <Badge className="text-truncate" key={tag.id}>{tag.label}</Badge>
                                ))}
                            </Stack>
                        )}
                    </Stack>
                )}
            </Col>
            <Col xs='auto'>
                <Stack direction="horizontal" gap={2} className="">
                    <Link to={`/${note.id}/edit`}>
                        <Button variant="primary">Edit</Button>
                    </Link>
                    <Button onClick={() => {
                        onDelete(note.id);
                        navigate("..");
                        
                    } } variant="outline-danger">Delete</Button>
                    <Link to={'/'}>
                        <Button variant="outline-secondary">Back</Button>
                    </Link>
                </Stack>
            </Col>
        </Row>
        <ReactMarkdown>{note.markdown}</ReactMarkdown>
    </>
}
