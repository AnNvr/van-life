# Van Life App

packages installed:

- react-router-dom
- mirage-js (for moking a server to run the data on it)
- tailwind (simplify the styling process)

STEP 1:

    Organise an array of data on server.js with mirage js and fetch it using Effect in the Vans page. Update the state array, and map over it to render a Van component with the data. (mirage js is returning bad parse although the code is correct. Investigation ongoing)

STEP 2:

    Each Van component should nest a route params for which when clicked over the comnponente a new rendering with the full dataset appears.
    I wrap each container of Van with a Link and set useParams().

    useParams() allow to grab any of the parameters in the URL, and in this case I am interested in grabbing the id to render the data of the selected Van. Import {useParams} from react-router-dom.
    It returns an object of key/value pairs of the dynamic params from the current URL that were matched by the <Route path>. From there, I defined state to populate a single data object and render it to screeen.

STEP 3:

    Refactor the code implementing nested routes, layout route and index route wherever is convenient or occurs. Some definitions to help for further orientation and reference:
    - Nested Route: used when it's necessary share the UI between routes without creating more pages or components
    - Layout Route: It's a parent route without path used to wrap the nested children routes within a specific layout
    - Outlet component: designed to render the children routes nested in a layout
    - Index route: a pathless child route that renders in the parent's outlet

STEP 4:

    Use OutletContext to pass the object of a vanByID with all the  deatils among the three different routes sharing a piece of UI among one another.
    For the parent component HostVanDetail, pass the state with OutletContext and render it to the children components HostVanInfo, HostVanPricing, HostVanPhotos.

STEP 5:

    deployment of useSearchParams() for filtering search parameters and filtering results while searching an object Van.

STEP 6:

    Transferring fetch logic to a separate file api.js, store the fetch logic into variable and import them wherever occurs to separate concerns.
    Implementation of the Error handling logic, loading logic and 404 page.

STEP 7:

    Protected routes.
    - Creation of the Login form.
    - Implementation of Authentication logic in a separate file for which a conditional statement checks if the user is authenticated to render the <Outlet /> of the children components. 

    On this note; I tried implementing Firebase authentication module ('firebase/auth') for handling registration and login. Although the process seems straight forward, it did not work as expectes for reason I wasn't able to debug. In short, when login/signup, any request sent from the client to the database returned a network error. Unfortunately I had to transition to a Custom based authentication approach, more complexed and potentially error prone, but hopefully more controllable.

STEP 8:
    Implementing a Modal form to create a new document (create van) brought me to consider reusability and adopt the same Modal as a component to deploy for either create and update a document.
    The <Modal /> becomes a component to import in the <Dashboard />.
    For the <Modal /> to be reusable for both creating and updating documents, it requires to manage its state based on the operation it's supposed to perform. This involves passing props to the <Modal /> to distinguish between creating and updating.

    Key steps to consider:

    - Define props: the <Modal/> component has to be modified to accept props that will set up whether it's in create or update mode. Also, it has to receive the data of van document when updating.
    - Passing props: when opening the <Modal/> to create a document, it's ok having the state isModalOpen == true without additional data, but when it comes to update, it's necessary to pass the selected van's data.
    - Handling submission: a conditional rendering should determine if the form submission should create or update based on the props. To do so, I need extra props to <Modal />.

    In Dashboard I define some state to keep track of which van is being edited.
    I need a function to open the modal for creating and a function to open it for updating. For both the function, the state to setIsModalOpen == true. 
    
    The recently implemented state selectedVan should be updated differently in each function: For creating, it will be null because we ensure there is no van selected at all; for updating we pass a "van" parameter and we use it as an argument to update selectedVan state for editing.

    The <Modal/> component is ready to accept props for van data and mode. Said so, I can pass in the Modal function the props onClose, onSubmit, and 'vanData'. More of this soon.
    Since the Modal hosts a form with input fields and I need to listen for changes in value, i define some state formData with each single db property set to an empty string, and a spread operator for the parameter 'vanData' that allows me to fill the input fields with existing data of the selected van (update mode) when is not null. 
    Instead of implementing an API call and logic to get a document by ID and populate the modal form with existing data when updating occurs, I can use existing data in 'vans' state and pass them to the form as entire object (and as a prop). The 'vanData' = null as default is for create purposes. It assumes there is no existing data for a van document, which it will be populated of new data by the time a new document will be created. The reason to use 'vanData' for prefilling the form when it's not null is to set the process of editing an existing document. I select a van to edit, so I pass its data, retrivied from the 'vans' state, directly to the <Modal/> as 'vanData'. A Firestor document is an entire object including its ID, and so 'vanData' is the entire object with ID.
    Else, when opning the modal to create a new doc, 'vanData' = null by default.

    for code reusability I have implemented both the create and update a document in the same 'handleFormSubmit' function.



