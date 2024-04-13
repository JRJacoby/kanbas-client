import { useEffect, useState } from "react";
import "./index.css";
import { FaGripVertical, FaCheckCircle, FaPlus, FaEllipsisV } from "react-icons/fa";
import { useParams } from "react-router";
import { IoMdArrowDropright } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import {
	initialState,
    addModule,
    deleteModule,
    updateModule,
    setNewModule,
	setModules
} from "./reducer";
import { KanbasState } from "../../store";
import * as client from "./client"

type Lesson = {
    _id: string;
    name: string;
    description: string;
    module: string;
}

type Module = {
    _id: string;
    name: string;
    description: string;
    course: string;
    lessons: Lesson[];
}

function ModuleList() {
    const { courseId } = useParams();
    const courseModules = useSelector((state: KanbasState) => state.modulesReducer.modules)
    const dispatch = useDispatch();

	const fetchModules = async () => {
		const modules = await client.findModulesForCourse(courseId)
		dispatch(setModules(modules))
	}

	useEffect(() => {
		fetchModules()
	}, [courseId])

    const [selectedModule, setSelectedModule] = useState(null);
    const newModule = useSelector((state: KanbasState) => state.modulesReducer.newModule);

	const handleAddModule = async () => {
		let module = {name: newModule.name, description: newModule.description}
		module = await client.createModule(courseId, module)
		dispatch(addModule(module))
	}

	const handleDeleteModule = async (moduleId: string) => {
		await client.deleteModule(moduleId)
		dispatch(deleteModule(moduleId))

		if (selectedModule && selectedModule._id === moduleId) {
			setSelectedModule(null)
		}

		if (newModule?._id === moduleId) {
			dispatch(setNewModule(initialState.newModule))
		}
	}

	const handleUpdateModule = async () => {
		if (!newModule._id) {
			return
		}

		const updatedModule = await client.updateModule(newModule)
		dispatch(updateModule(updatedModule))
	}

    return (
        <div className="flex-grow-1">
            <div className="jj-home-header-buttons">
                <button className="jj-grey-btn">Collapse All</button>
                <button className="jj-grey-btn">View Progress</button>
                <select className="jj-grey-btn">
                    <option>✓ Publish All</option>
                </select>
                <button className="jj-red-btn">+ Module</button>
                <button className="jj-grey-btn"><FaEllipsisV /></button>
            </div>
            <hr />
            <form>
                <button className="jj-red-btn" onClick={(e) => {e.preventDefault(); handleAddModule()}}>Add</button>
                <button className="jj-grey-btn" onClick={(e) => {e.preventDefault(); handleUpdateModule()}}>Update</button>
                <div className="form-group">
                    <label htmlFor="new-module-name">New Module Name</label>
                    <input id="new-module-name" className="form-control" value={newModule.name} onChange={(e) => dispatch(setNewModule({ ...newModule, name: e.target.value }))} />
                </div>
                <div className="form-group">
                    <label htmlFor="new-module-description">New Module Description</label>
                    <textarea id="new-module-description" className="form-control" value={newModule.description} onChange={(e) => dispatch(setNewModule({ ...newModule, description: e.target.value }))} />
                </div>
            </form>
            <ul className="list-group wd-modules">
                {courseModules
                    .filter(module => module.course === courseId)
                    .map(module => {
                        return (
                            <li key={module._id} className="list-group-item" onClick={() => setSelectedModule(module)}>
                                <div className="jj-list-item-inner">
                                    <FaGripVertical className="jj-list-grip" /><IoMdArrowDropright />{module.name}
                                    <span className="float-end">
                                        <button className="jj-grey-btn jj-edit-module-btn" onClick={() => { dispatch(setNewModule(module)) }}>Edit</button>
                                        <button className="jj-red-btn jj-delete-module-btn" onClick={() => handleDeleteModule(module._id)}>Delete</button>
                                        <span className="jj-check-dropdown">
                                            <FaCheckCircle className="text-success" />
                                            <IoMdArrowDropright />
                                        </span>
                                        <FaPlus className="jj-list-plus" />
                                        <FaEllipsisV />
                                    </span>
                                </div>
                                {selectedModule && selectedModule._id === module._id && (
                                    module.lessons?.length > 0 && (
                                        <ul className="list-group">
                                            {module.lessons.map((lesson: Lesson) => {
                                                return (
                                                    <li key={lesson._id} className="list-group-item">
                                                        <FaGripVertical className="jj-list-grip" />{lesson.name}
                                                        <span className="float-end">
                                                            <FaCheckCircle className="text-success" />
                                                            <FaEllipsisV />
                                                        </span>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    )
                                )}
                            </li>
                        )
                    })}
            </ul>
        </div>
    )
}
export default ModuleList;
