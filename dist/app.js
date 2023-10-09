// Code for the navigation
const button = document.getElementById("responsive-button");

const menu = document.getElementById("menu").style;
button.style.display = "block";

button.onclick = (e) => {
  const menu = document.getElementById("menu").style.display;

  if (menu === "block") {
    document.getElementById("menu").style.display = "none";
  } else {
    document.getElementById("menu").style.display = "block";
  }
};

const link = document.querySelectorAll(".link").forEach((element) =>
  element.addEventListener("click", () => {
    if (window.screen.width < 1020) {
      document.getElementById("menu").style.display = "none";
    }
  })
);

// Creates object of all expertises
let treatmentObj = {};
treatmentObj.christianCounseling = {
  title: "Christian Counseling",
  description: `Christian counseling works by recognizing the close connection between a person's emotional or psychological well-being and their faith. It allows clients to bring their whole selves into therapy in order to develop coping strategies that align with their personal beliefs. Christian counseling draws upon the principles of Christianity to help individuals navigate mental health conditions like depression and anxiety, relationship problems, grief, or anger. It is important to note that not all Christian counselors are licensed therapists. While some integrate evidence-based psychological principles into their practice, others may not.`,
};

treatmentObj.cbt = {
  title: "Cognitive Behavioral (CBT)",
  description: `Cognitive-behavioral therapy stresses the role of thinking in how we feel and what we do. It is based on the belief that thoughts, rather than people or events, cause our negative feelings. The therapist assists the client in identifying, testing the reality of, and correcting dysfunctional beliefs underlying his or her thinking. The therapist then helps the client modify those thoughts and the behaviors that flow from them. CBT is a structured collaboration between therapist and client and often calls for homework assignments. CBT has been clinically proven to help clients in a relatively short amount of time with a wide range of disorders, including depression and anxiety.`,
};

treatmentObj.eclectic = {
  title: "Eclectic",
  description: `Many practitioners take an eclectic approach to therapy, drawing upon various aspects of cognitive-behavioral and psychodynamic methods to create their own custom-made approach. Such therapists often work with their clients to create a treatment plan that encompasses different techniques to best address the client's particular problems and to appeal to their sensibility.`,
};

treatmentObj.edmr = {
  title: "EDMR",
  description: `EMDR (Eye Movement Desensitization and Reprocessing) is an information processing therapy that helps clients cope with trauma, addictions, and phobias. During this treatment, the patient focuses on a specific thought, image, emotion, or sensation while simultaneously watching the therapist's finger or baton move in front of his or her eyes. The client is told to recognize what comes up for him/her when thinking of an image; then the client is told to let it go while doing bilateral stimulation. It's like being on a train; an emotion or a thought may come up and the client lets it pass as though they were looking out the window of the moving train.`,
};

treatmentObj.culturallySensitive = {
  title: "Culturally Sensitive",
  description: `Culturally sensitive therapists provide therapy that is culturally sensitive. They understand that people from different backgrounds have different values, practices, and beliefs, and are sensitive to those differences when working with individuals and families in therapy.`,
};

treatmentObj.dialectical = {
  title: "Dialectical Behavior (DBT)",
  description: `Dialectical Behavior Therapy (DBT) is the treatment most closely associated with Borderline Personality Disorder (BPD). Therapists practice DBT in both individual and group sessions. The therapy combines elements of CBT to help with regulating emotion through distress tolerance and mindfulness. The goal of Dialectical Behavior Therapy is to alleviate the intense emotional pain associated with BPD.`,
};

treatmentObj.existential = {
  title: "Existential",
  description: `Existential psychotherapy is based on the philosophical belief that human beings are alone in the world, and that this aloneness can only be overcome by creating one's own meaning, and exercising one's freedom to choose. The existential therapist encourages clients to face life's anxieties head on and to start making their own decisions. The therapist will emphasize that, along with having the freedom to carve out meaning, comes the need to take full responsibility for the consequences of one's decisions. Therapy sessions focus on the client's present and future rather than their past.`,
};

treatmentObj.erp = {
  title: "Exposure Response Prevention (ERP)",
  description: `Exposure and response prevention (ERP) is an evidence-based form of cognitive behavioral therapy (CBT) that offers effective treatment for various conditions including anxiety, phobias, and eating disorders. It is considered a particularly effective treatment for obsessive-compulsive disorder (OCD). ERP usually includes a dozen or more sessions and starts with assessment and education. ERP then follows two essential steps, firstly, individuals are directly exposed to stimuli that typically evoke fear, distress, obsessive thoughts, or compulsive behaviors. Secondly, they learn therapeutic techniques to prevent their usual maladaptive responses.`,
};

treatmentObj.integrative = {
  title: "Integrative",
  description: `Integrative therapy refers to therapy in which elements from different types of therapy may be used. Therapists 'integrate' two or more therapeutic styles (e.g. Cognitive and Family Systems) to bring about a personalized and practical approach to healing.

  Integrative therapy (with a small 'i') may also refer to the process of 'integrating' the personality by taking disowned or unresolved aspects of the self and making them part of a cohesive personality whole. It reduces the use of defense mechanisms that inhibit spontaneity and allows flexibility in solving emotional problems.`,
};

treatmentObj.mbct = {
  title: "Mindfulness-Based (MBCT)",
  description: `For clients with chronic pain, hypertension, heart disease, cancer, and other health issues such as anxiety and depression, mindfulness-based cognitive therapy, or MBCT, is a two-part therapy that aims to reduce stress, manage pain, and embrace the freedom to respond to situations by choice. MCBT blends two disciplines--cognitive therapy and mindfulness. Mindfulness helps by reflecting on moments and thoughts without passing judgment. MBCT clients pay close attention to their feelings to reach an objective mindset, thus viewing and combating life's unpleasant occurrences.`,
};

treatmentObj.motivational = {
  title: "Motivational Interviewing",
  description: `Motivational Interviewing (MI) is a method of therapy that works to engage the motivation of clients to change their behavior. Clients are encouraged to explore and confront their ambivalence. Therapists attempt to influence their clients to consider making changes, rather than non-directively explore themselves. Motivational Interviewing is frequently used in cases of problem drinking or mild addictions.`,
};

treatmentObj.personCentered = {
  title: "Person-Centered",
  description: `Person-centered therapy uses a non-authoritative approach that allows clients to take more of a lead in discussions so that, in the process, they will discover their own solutions. The therapist acts as a compassionate facilitator, listening without judgment and acknowledging the client's experience without moving the conversation in another direction. The therapist is there to encourage and support the client and to guide the therapeutic process without interrupting or interfering with the client's process of self-discovery.`,
};

treatmentObj.psychoanalytic = {
  title: "Psychoanalytic",
  description: `The client learns what conscious and unconscious wishes drive their patterns of thinking and behavior on the theory that, by making the unconscious conscious, they will make more educated choices over how they think and act. Traditional psychoanalysts may treat clients intensively but reveal little of their own views or feelings during therapy. Modern psychoanalysts may treat less frequently and take a more interactive approach.`,
};

treatmentObj.traumaFocused = {
  title: "Trauma Focused",
  description: `Trauma focused cognitive behavioral therapy (TF-CBT) helps people who may be experiencing post-traumatic stress after a traumatic event to return to a healthy state.`,
};

const clickTreatment = (e) => {
  if (treatmentObj[e.target.id]) {
    document.getElementById("modal-1-title").textContent =
      treatmentObj[e.target.id].title;

    document.getElementById("modal-1-content").textContent =
      treatmentObj[e.target.id].description;
  } else {
    document.getElementById("modal-1-title").textContent = "invalid title";
    document.getElementById("modal-1-content").textContent =
      "invalid description";
  }
};

document
  .getElementById("treatment-list")
  .addEventListener("click", clickTreatment);
