import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as cn } from "./router-CdjbcmP6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/questions-4uhy6iuF.js
var import_jsx_runtime = require_jsx_runtime();
function Badge({ className, tone = "muted", children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium tracking-wide", tone === "muted" && "bg-muted text-muted-foreground", tone === "red" && "bg-primary/10 text-primary", tone === "sage" && "bg-success/10 text-success", tone === "ink" && "bg-foreground text-background", className),
		children
	});
}
var papers = [
	{
		id: 1,
		title: "Paper I",
		subtitle: "A–C · according to – come back"
	},
	{
		id: 2,
		title: "Paper II",
		subtitle: "C–E · comfort – everyone"
	},
	{
		id: 3,
		title: "Paper III",
		subtitle: "F–L · famous – lack"
	},
	{
		id: 4,
		title: "Paper IV",
		subtitle: "L–R · lead – result"
	},
	{
		id: 5,
		title: "Paper V",
		subtitle: "R–Z · rise – your"
	}
];
var questions = [
	{
		id: "p1-01",
		paper: 1,
		prompt: "I am afraid of acrossing that road at night, but I cannot avoid doing so; otherwise, I can't go back home.",
		accepted: [{
			type: "replace",
			word: "acrossing",
			to: "crossing"
		}],
		explanation: "'Across' is a preposition, not a verb. The verb is 'cross' → crossing.",
		headword: "across"
	},
	{
		id: "p1-02",
		paper: 1,
		prompt: "Although the price of this umbrella is low, I still choose that umbrella because I like red color.",
		accepted: [
			{
				type: "delete",
				word: "color"
			},
			{
				type: "delete",
				word: "colour"
			},
			{
				type: "replace",
				word: "color",
				to: "colour"
			}
		],
		explanation: "Do not add 'colour/color' after a colour word. Say 'I like red'. (If you only Americanised the spelling, that is not the error the paper is after.)",
		headword: "colour"
	},
	{
		id: "p1-03",
		paper: 1,
		prompt: "Because of the heavy rain, Tom arrived at school late. Jenny was also late too.",
		accepted: [{
			type: "delete",
			word: "too"
		}, {
			type: "delete",
			word: "also"
		}],
		explanation: "'Also' and 'too' mean the same here. Keep one of them, not both.",
		headword: "also"
	},
	{
		id: "p1-04",
		paper: 1,
		prompt: "Scientists are conducting a chemical analysis to analyse a blue substance found on Mars.",
		accepted: [{ type: "none" }],
		explanation: "No grammar error. 'Analysis' is the noun and 'analyse' is the verb, and both are used correctly.",
		headword: "analysis"
	},
	{
		id: "p1-05",
		paper: 1,
		prompt: "The father arrived at the hospital at 3:00 p.m. and he waited there anxiously for 5 hours; at last, his baby born at 8:15 p.m.",
		accepted: [{
			type: "insert",
			word: "was",
			before: "born"
		}],
		explanation: "Birth takes the passive: 'his baby was born'. 'Born' is not a verb by itself.",
		headword: "born"
	},
	{
		id: "p1-06",
		paper: 1,
		prompt: "Mother called him to choose the cheap shoes, but he refused. He went back home with the most expensive choice – a pair of Naike costing $1,200!",
		accepted: [{
			type: "replace",
			word: "called",
			to: "told"
		}, {
			type: "replace",
			word: "called",
			to: "asked"
		}],
		explanation: "'Call' is not used for giving an instruction. Use 'told' or 'asked' him to choose.",
		headword: "call"
	},
	{
		id: "p1-07",
		paper: 1,
		prompt: "She feels happy when she arrives school. However, she feels depressed when she arrives home because of her poor relationship with her parents.",
		accepted: [{
			type: "insert",
			word: "at",
			after: "arrives",
			nth: 0
		}],
		explanation: "Arrive at a building (school). 'Home' is one of the few places that takes no preposition.",
		headword: "arrive"
	},
	{
		id: "p2-01",
		paper: 2,
		prompt: "This social worker concerned about the poor boy whose father died in a traffic accident last night.",
		accepted: [{
			type: "insert",
			word: "is",
			before: "concerned"
		}, {
			type: "insert",
			word: "was",
			before: "concerned"
		}],
		explanation: "People 'are concerned about' something. The verb 'concern' does not take 'about'.",
		headword: "concern"
	},
	{
		id: "p2-02",
		paper: 2,
		prompt: "To Thomas, solving those complicate mathematical problems is his everyday task.",
		accepted: [{
			type: "replace",
			word: "complicate",
			to: "complicated"
		}],
		explanation: "The adjective is 'complicated'. 'Complicate' is a verb.",
		headword: "complicate"
	},
	{
		id: "p2-03",
		paper: 2,
		prompt: "In this details report, the scientist emphasizes the importance of stopping global warming.",
		accepted: [{
			type: "replace",
			word: "details",
			to: "detailed"
		}, {
			type: "replace",
			word: "emphasizes",
			to: "emphasises"
		}],
		explanation: "Before a noun, use the adjective 'detailed report', not 'details report'.",
		headword: "detail"
	},
	{
		id: "p2-04",
		paper: 2,
		prompt: "Despite the comfort that the hotel offers, he still complained about the poor attitude of the staff there.",
		accepted: [{ type: "none" }],
		explanation: "No error. 'Comfort' is correctly used as a noun, and 'complained about' is the right verb pattern.",
		headword: "comfort"
	},
	{
		id: "p2-05",
		paper: 2,
		prompt: "Everyone agrees that travelling on the MTR is convenient but dull.",
		accepted: [{ type: "none" }],
		explanation: "No error. 'Everyone' takes a singular verb, and both 'convenient' and 'dull' are adjectives describing the journey.",
		headword: "everybody"
	},
	{
		id: "p2-06",
		paper: 2,
		prompt: "The company spent a lot of money buying equipments. They bought printers, computers, and etc.",
		accepted: [{
			type: "replace",
			word: "equipments",
			to: "equipment"
		}, {
			type: "delete",
			word: "and"
		}],
		explanation: "Two classic traps appear here, but you only need to catch one: 'equipment' is uncountable, and 'etc.' already contains 'and'.",
		headword: "equipment"
	},
	{
		id: "p2-07",
		paper: 2,
		prompt: "The ladies are discussing about the expensive handbag that Mary has just bought.",
		accepted: [{
			type: "delete",
			word: "about"
		}],
		explanation: "'Discuss' already means 'talk about', so 'about' is redundant.",
		headword: "discuss"
	},
	{
		id: "p3-01",
		paper: 3,
		prompt: "During the flag-raising ceremony, the teacher told us to put our bags on the floor.",
		accepted: [{ type: "none" }],
		explanation: "No error. Bags inside a hall go on the floor. 'Ground' is the outdoor surface.",
		headword: "floor"
	},
	{
		id: "p3-02",
		paper: 3,
		prompt: "The teacher gave the student go to the toilet.",
		accepted: [{
			type: "replace",
			word: "gave",
			to: "let"
		}, {
			type: "insert",
			word: "permission",
			after: "student"
		}],
		explanation: "To allow someone to leave is 'let the student go', not 'gave the student go'.",
		headword: "give"
	},
	{
		id: "p3-03",
		paper: 3,
		prompt: "This is the first time I have got in a plane, so I am a bit frightened.",
		accepted: [{
			type: "replace",
			word: "in",
			to: "on"
		}, {
			type: "replace",
			word: "got",
			to: "been"
		}],
		explanation: "We get on a plane, bus or train (not 'in').",
		headword: "first time"
	},
	{
		id: "p3-04",
		paper: 3,
		prompt: "Jerry is friend with Tom.",
		accepted: [{
			type: "replace",
			word: "friend",
			to: "friends"
		}, {
			type: "insert",
			word: "a",
			before: "friend"
		}],
		explanation: "The expression is 'be friends with' (plural), or 'a friend of'.",
		headword: "friend"
	},
	{
		id: "p3-05",
		paper: 3,
		prompt: "The student lacks of confidence, although he has studied very hard in the past two years for HKCEE.",
		accepted: [{
			type: "delete",
			word: "of"
		}],
		explanation: "The verb 'lack' takes a direct object: 'lacks confidence'. 'A lack of' is the noun pattern.",
		headword: "lack"
	},
	{
		id: "p3-06",
		paper: 3,
		prompt: "When the explosion was happened last night, I was doing my homework.",
		accepted: [{
			type: "delete",
			word: "was"
		}],
		explanation: "'Happen' cannot be used in the passive. Write 'when the explosion happened'.",
		headword: "happen"
	},
	{
		id: "p3-07",
		paper: 3,
		prompt: "On Sundays, have a lot of people like lying on that grassland to enjoy the sunlight.",
		accepted: [{
			type: "replace",
			word: "have",
			to: "there are"
		}, {
			type: "insert",
			word: "there",
			before: "have"
		}],
		explanation: "Cantonese 有 often becomes 'have' by mistake. English needs 'there are a lot of people'.",
		headword: "have"
	},
	{
		id: "p4-01",
		paper: 4,
		prompt: "Because she lives in the New Territories and her office is on Hong Kong Island, every day she wakes up at 6 o'clock a.m.",
		accepted: [{
			type: "delete",
			word: "a.m."
		}, {
			type: "delete",
			word: "o'clock"
		}],
		explanation: "'O'clock' and 'a.m./p.m.' are not used together. Keep one system of telling the time.",
		headword: "o'clock"
	},
	{
		id: "p4-02",
		paper: 4,
		prompt: "I will borrow that book from him because I am like it very much!",
		accepted: [{
			type: "delete",
			word: "am"
		}],
		explanation: "'Like' is the verb here. 'I am like' would mean 'I resemble'.",
		headword: "like"
	},
	{
		id: "p4-03",
		paper: 4,
		prompt: "I am opposed to her suggestion of opening the air-conditioner; I think we can simply open the windows and let the wind get in to cool us down.",
		accepted: [{
			type: "replace",
			word: "opening",
			to: "turning on"
		}, {
			type: "replace",
			word: "opening",
			to: "switching on"
		}],
		explanation: "Windows open. Electrical appliances are turned on or switched on.",
		headword: "open"
	},
	{
		id: "p4-04",
		paper: 4,
		prompt: "Many of parents in Hong Kong try their best to make their children work hard for public examinations.",
		accepted: [{
			type: "delete",
			word: "of"
		}],
		explanation: "'Many of' must be followed by a defined group ('many of the parents'). Here it is just 'many parents'.",
		headword: "many"
	},
	{
		id: "p4-05",
		paper: 4,
		prompt: "Let me tell you a good news – most customers think that the price of the new product of our company is reasonable!",
		accepted: [{
			type: "replace",
			word: "a",
			to: "some"
		}, {
			type: "delete",
			word: "a"
		}],
		explanation: "'News' is uncountable. Say 'some good news' or 'a piece of good news'.",
		headword: "news"
	},
	{
		id: "p4-06",
		paper: 4,
		prompt: "From my point of view, while F.5 students should work hard to prepare their HKCEE, they should also pay attention to their health.",
		accepted: [{
			type: "insert",
			word: "for",
			after: "prepare"
		}],
		explanation: "Students prepare for an examination.",
		headword: "prepare"
	},
	{
		id: "p4-07",
		paper: 4,
		prompt: "If possible, I think F.5 students should still spare some time participating extra curricular activities.",
		accepted: [{
			type: "insert",
			word: "in",
			after: "participating"
		}, {
			type: "replace",
			word: "participating",
			to: "for"
		}],
		explanation: "'Participate' needs 'in': participating in extra-curricular activities.",
		headword: "participate"
	},
	{
		id: "p4-08",
		paper: 4,
		prompt: "I will make my father to give up smoking – in fact, most of our family members object to his smoking habit.",
		accepted: [{
			type: "delete",
			word: "to",
			nth: 0
		}],
		explanation: "'Make' + object + bare infinitive: make my father give up smoking.",
		headword: "make"
	},
	{
		id: "p4-09",
		paper: 4,
		prompt: "When I am travelling in other countries, I like recognizing new friends there.",
		accepted: [
			{
				type: "replace",
				word: "recognizing",
				to: "making"
			},
			{
				type: "replace",
				word: "recognizing",
				to: "meeting"
			},
			{
				type: "replace",
				word: "recognising",
				to: "making"
			}
		],
		explanation: "'Recognise' is to realise you already know someone. New friends are made or met.",
		headword: "recognise"
	},
	{
		id: "p4-10",
		paper: 4,
		prompt: "Nowadays teenagers spend much money to make their own outlook more attractive – for example, my younger brother has just paid a lot for a new hairstyle.",
		accepted: [{
			type: "replace",
			word: "outlook",
			to: "appearance"
		}, {
			type: "replace",
			word: "outlook",
			to: "looks"
		}],
		explanation: "'Outlook' is a person's attitude to life. Looks are 'appearance'.",
		headword: "outlook"
	},
	{
		id: "p4-11",
		paper: 4,
		prompt: "Yesterday, I phoned to my friend to ask him to participate in the activity organized by my club.",
		accepted: [{
			type: "delete",
			word: "to",
			nth: 0
		}],
		explanation: "'Phone' takes a direct object: I phoned my friend.",
		headword: "phone"
	},
	{
		id: "p4-12",
		paper: 4,
		prompt: "You can hardly pay attention on the traffic if you are listening to music on your MP3 playing!",
		accepted: [{
			type: "replace",
			word: "on",
			to: "to",
			nth: 0
		}, {
			type: "replace",
			word: "playing",
			to: "player"
		}],
		explanation: "The phrase is 'pay attention to', not 'on'.",
		headword: "pay attention"
	},
	{
		id: "p4-13",
		paper: 4,
		prompt: "Why do I like this place? The reason is that it is very quite and I can relax here.",
		accepted: [{
			type: "replace",
			word: "quite",
			to: "quiet"
		}],
		explanation: "'Quiet' means not noisy. 'Quite' means fairly.",
		headword: "quiet / quite"
	},
	{
		id: "p4-14",
		paper: 4,
		prompt: "That social worker is very kind; last night when he knew that I had no money, he borrowed $500 to me.",
		accepted: [{
			type: "replace",
			word: "borrowed",
			to: "lent"
		}, {
			type: "replace",
			word: "to",
			to: "from"
		}],
		explanation: "You borrow from someone and lend to someone.",
		headword: "lend"
	},
	{
		id: "p4-15",
		paper: 4,
		prompt: "If you feel hot, just put off your coat! Don't ask me to switch on the air-conditioner!",
		accepted: [{
			type: "replace",
			word: "put",
			to: "take"
		}],
		explanation: "Clothes are taken off. 'Put off' means postpone.",
		headword: "put"
	},
	{
		id: "p4-16",
		paper: 4,
		prompt: "I like living in New Territories than living on Hong Kong Island.",
		accepted: [{
			type: "insert",
			word: "the",
			before: "New"
		}, {
			type: "insert",
			word: "more",
			before: "than"
		}],
		explanation: "Say 'the New Territories' (plural place names take 'the'). Also, 'like … than' needs 'more'.",
		headword: "New Territories"
	},
	{
		id: "p5-01",
		paper: 5,
		prompt: "Since that locker does not look safety, I store my valuables in my school bag during PE lessons.",
		accepted: [{
			type: "replace",
			word: "safety",
			to: "safe"
		}],
		explanation: "'Look' is followed by an adjective: look safe. 'Safety' is the noun.",
		headword: "safety"
	},
	{
		id: "p5-02",
		paper: 5,
		prompt: "In order to raise the amount of sales of the shop, the sales put up an eye-catching poster at the entrance.",
		accepted: [
			{
				type: "replace",
				word: "sales",
				to: "salespeople",
				nth: 1
			},
			{
				type: "replace",
				word: "sales",
				to: "salespersons",
				nth: 1
			},
			{
				type: "replace",
				word: "sales",
				to: "salesperson",
				nth: 1
			}
		],
		explanation: "'Sales' is not a person. Use salesperson / salespeople.",
		headword: "sales"
	},
	{
		id: "p5-03",
		paper: 5,
		prompt: "It rains hard, so that we have to spend our afternoon playing Monopoly at home.",
		accepted: [{
			type: "delete",
			word: "that"
		}],
		explanation: "'So that' expresses purpose. A result clause is introduced by 'so'.",
		headword: "so that"
	},
	{
		id: "p5-04",
		paper: 5,
		prompt: "This 22-year-old boy has become the most succeed salesperson of that boutique.",
		accepted: [{
			type: "replace",
			word: "succeed",
			to: "successful"
		}, {
			type: "replace",
			word: "succeed",
			to: "successful"
		}],
		explanation: "The adjective is 'successful'. 'Succeed' is a verb; 'success' is a noun.",
		headword: "success"
	},
	{
		id: "p5-05",
		paper: 5,
		prompt: "My mother does not like very up-to-date clothes; my grandmother does not too.",
		accepted: [{
			type: "replace",
			word: "too",
			to: "either"
		}],
		explanation: "After a negative verb, use 'either', not 'too'.",
		headword: "too"
	},
	{
		id: "p5-06",
		paper: 5,
		prompt: "Every year, quite a number of people in HK suicide due to pressure; I suggest depressed people seek help from social workers.",
		accepted: [{
			type: "insert",
			word: "commit",
			before: "suicide"
		}, {
			type: "replace",
			word: "suicide",
			to: "commit suicide"
		}],
		explanation: "'Suicide' is a noun in English. The verb phrase is 'commit suicide'.",
		headword: "suicide"
	},
	{
		id: "p5-07",
		paper: 5,
		prompt: "It is worth learning Photoshop since you can use this software to edit photos easily.",
		accepted: [{ type: "none" }],
		explanation: "No error. 'Worth' is correctly followed by the -ing form.",
		headword: "worth"
	},
	{
		id: "p5-08",
		paper: 5,
		prompt: "At 12:00 a.m., the servant will bring the lunchbox to his boss.",
		accepted: [{
			type: "replace",
			word: "a.m.",
			to: "noon"
		}, {
			type: "replace",
			word: "12:00",
			to: "noon"
		}],
		explanation: "12:00 a.m. is midnight. Lunch is at 12 noon.",
		headword: "twelve o'clock"
	},
	{
		id: "p5-09",
		paper: 5,
		prompt: "Though he likes the film very much, I can sure that he has not bought the DVD of the film, since the DVD is very expensive!",
		accepted: [{
			type: "replace",
			word: "can",
			to: "am"
		}, {
			type: "insert",
			word: "be",
			after: "can"
		}],
		explanation: "'Sure' is an adjective: I am sure / I can be sure. It is not a verb.",
		headword: "sure"
	},
	{
		id: "p5-10",
		paper: 5,
		prompt: "While I was sitting the ferry, I saw the rainbow!",
		accepted: [{
			type: "insert",
			word: "on",
			after: "sitting"
		}, {
			type: "replace",
			word: "sitting",
			to: "taking"
		}],
		explanation: "You sit on a ferry, or you take a ferry.",
		headword: "sit"
	},
	{
		id: "p5-11",
		paper: 5,
		prompt: "A staff in that bookshop suggested I should buy that book written by Ba Jin.",
		accepted: [{
			type: "insert",
			word: "member",
			after: "staff"
		}, {
			type: "replace",
			word: "staff",
			to: "staff member"
		}],
		explanation: "'Staff' is the whole group. One person is a staff member / a member of staff.",
		headword: "staff"
	},
	{
		id: "p5-12",
		paper: 5,
		prompt: "I was so surprise that she did not go to the airport to welcome BoA!",
		accepted: [{
			type: "replace",
			word: "surprise",
			to: "surprised"
		}],
		explanation: "A person feels surprised.",
		headword: "surprise"
	},
	{
		id: "p5-13",
		paper: 5,
		prompt: "It was so surprise that she did not go to the airport to welcome BoA!",
		accepted: [{
			type: "replace",
			word: "surprise",
			to: "surprising"
		}],
		explanation: "A fact or situation is surprising.",
		headword: "surprise"
	},
	{
		id: "p5-14",
		paper: 5,
		prompt: "Since Kent did not feel well, so he returned home early.",
		accepted: [{
			type: "delete",
			word: "so"
		}, {
			type: "delete",
			word: "Since"
		}],
		explanation: "'Since' and 'so' must not be used together. Keep one linker.",
		headword: "since"
	},
	{
		id: "p5-15",
		paper: 5,
		prompt: "I will spend $10,000 buying a car so I can travel around conveniently at weekends.",
		accepted: [{ type: "none" }],
		explanation: "No error. Spend + amount of money + -ing is the correct pattern.",
		headword: "use"
	},
	{
		id: "p5-16",
		paper: 5,
		prompt: "In this English lesson, she learnt 20 new vocabularies.",
		accepted: [{
			type: "replace",
			word: "vocabularies",
			to: "words"
		}, {
			type: "replace",
			word: "vocabularies",
			to: "vocabulary items"
		}],
		explanation: "'Vocabulary' is uncountable. You learn new words.",
		headword: "vocabulary"
	},
	{
		id: "p5-17",
		paper: 5,
		prompt: "I think I should set off now, since my friend is waiting me downstairs.",
		accepted: [{
			type: "insert",
			word: "for",
			after: "waiting"
		}],
		explanation: "You wait for someone.",
		headword: "wait"
	},
	{
		id: "p5-18",
		paper: 5,
		prompt: "Is this rude man the so-call Mr. Gentleman?",
		accepted: [{
			type: "replace",
			word: "so-call",
			to: "so-called"
		}, {
			type: "replace",
			word: "so-call",
			to: "so-called"
		}],
		explanation: "The adjective is 'so-called'.",
		headword: "so-called"
	},
	{
		id: "d-across",
		paper: "drill",
		prompt: "I acrossed the road on my way to school.",
		accepted: [{
			type: "replace",
			word: "acrossed",
			to: "crossed"
		}],
		explanation: "The verb is 'cross'. 'Across' is a preposition.",
		headword: "across"
	},
	{
		id: "d-accompany",
		paper: "drill",
		prompt: "I accompanied with my father to the concert.",
		accepted: [{
			type: "delete",
			word: "with"
		}],
		explanation: "'Accompany' already means 'go with'.",
		headword: "accompany"
	},
	{
		id: "d-advice",
		paper: "drill",
		prompt: "Her advices are always good.",
		accepted: [{
			type: "replace",
			word: "advices",
			to: "advice"
		}, {
			type: "replace",
			word: "are",
			to: "is"
		}],
		explanation: "'Advice' is uncountable: her advice is always good.",
		headword: "advice"
	},
	{
		id: "d-afraid",
		paper: "drill",
		prompt: "I afraid of the dark.",
		accepted: [{
			type: "insert",
			word: "am",
			before: "afraid"
		}],
		explanation: "'Afraid' is an adjective: I am afraid of the dark.",
		headword: "afraid"
	},
	{
		id: "d-agree",
		paper: "drill",
		prompt: "I am agree with your plan.",
		accepted: [{
			type: "delete",
			word: "am"
		}],
		explanation: "'Agree' is a verb, so drop 'am'.",
		headword: "agree"
	},
	{
		id: "d-although",
		paper: "drill",
		prompt: "Although it was raining but we still went on the picnic.",
		accepted: [{
			type: "delete",
			word: "but"
		}],
		explanation: "Do not pair 'although' with 'but'.",
		headword: "although"
	},
	{
		id: "d-apply",
		paper: "drill",
		prompt: "I shall apply a job once I get my exam results.",
		accepted: [{
			type: "insert",
			word: "for",
			after: "apply"
		}],
		explanation: "You apply for a job.",
		headword: "apply"
	},
	{
		id: "d-avoid",
		paper: "drill",
		prompt: "Jimmy often avoids to wash his hair.",
		accepted: [{
			type: "replace",
			word: "to",
			to: "washing"
		}],
		explanation: "'Avoid' is followed by an -ing form.",
		headword: "avoid"
	},
	{
		id: "d-because",
		paper: "drill",
		prompt: "Because she was too young, so she couldn't enter the race.",
		accepted: [{
			type: "delete",
			word: "so"
		}],
		explanation: "'Because' and 'so' must not be used together.",
		headword: "because"
	},
	{
		id: "d-before",
		paper: "drill",
		prompt: "She came to Hong Kong ten years before.",
		accepted: [{
			type: "replace",
			word: "before",
			to: "ago"
		}],
		explanation: "Count back from now with 'ago'.",
		headword: "before"
	},
	{
		id: "d-behaviour",
		paper: "drill",
		prompt: "Their behaviours are very bad.",
		accepted: [{
			type: "replace",
			word: "behaviours",
			to: "behaviour"
		}, {
			type: "replace",
			word: "are",
			to: "is"
		}],
		explanation: "'Behaviour' is uncountable.",
		headword: "behaviour"
	},
	{
		id: "d-better",
		paper: "drill",
		prompt: "You had better to think about the future.",
		accepted: [{
			type: "delete",
			word: "to"
		}],
		explanation: "'Had better' is followed by a bare infinitive.",
		headword: "better"
	},
	{
		id: "d-between",
		paper: "drill",
		prompt: "Tomorrow's temperature will vary between 20 to 32.",
		accepted: [{
			type: "replace",
			word: "to",
			to: "and"
		}],
		explanation: "Use 'between … and …'.",
		headword: "between"
	},
	{
		id: "d-boring",
		paper: "drill",
		prompt: "Listening to the speech, I was very boring.",
		accepted: [{
			type: "replace",
			word: "boring",
			to: "bored"
		}],
		explanation: "People feel bored; a speech can be boring.",
		headword: "boring"
	},
	{
		id: "d-british",
		paper: "drill",
		prompt: "He will travel to British on business.",
		accepted: [{
			type: "replace",
			word: "British",
			to: "Britain"
		}],
		explanation: "'British' is the adjective; the country is Britain.",
		headword: "British"
	},
	{
		id: "d-broadcast",
		paper: "drill",
		prompt: "The news was broadcasted at 7.30 p.m.",
		accepted: [{
			type: "replace",
			word: "broadcasted",
			to: "broadcast"
		}],
		explanation: "The past participle of 'broadcast' is 'broadcast'.",
		headword: "broadcast"
	},
	{
		id: "d-bought",
		paper: "drill",
		prompt: "I went to the shop and brought a new dress.",
		accepted: [{
			type: "replace",
			word: "brought",
			to: "bought"
		}],
		explanation: "'Brought' = bring. 'Bought' = buy.",
		headword: "brought"
	},
	{
		id: "d-built-up",
		paper: "drill",
		prompt: "The hospital was built up in 1970.",
		accepted: [{
			type: "delete",
			word: "up"
		}],
		explanation: "A building is built, not built up.",
		headword: "built-up"
	},
	{
		id: "d-camping",
		paper: "drill",
		prompt: "On holidays we often go to camping.",
		accepted: [{
			type: "delete",
			word: "to"
		}],
		explanation: "Go camping, go swimming, go shopping — no 'to'.",
		headword: "camping"
	},
	{
		id: "d-cheap",
		paper: "drill",
		prompt: "Prices are cheap in a street market.",
		accepted: [{
			type: "replace",
			word: "cheap",
			to: "low"
		}],
		explanation: "Prices are high or low. Goods are cheap or expensive.",
		headword: "cheap"
	},
	{
		id: "d-china",
		paper: "drill",
		prompt: "The China government has new economic policies.",
		accepted: [{
			type: "replace",
			word: "China",
			to: "Chinese"
		}],
		explanation: "The adjective is Chinese.",
		headword: "China"
	},
	{
		id: "d-choice",
		paper: "drill",
		prompt: "I shall choice engineering.",
		accepted: [{
			type: "replace",
			word: "choice",
			to: "choose"
		}],
		explanation: "'Choice' is a noun; the verb is 'choose'.",
		headword: "choice"
	},
	{
		id: "d-clothes",
		paper: "drill",
		prompt: "He put on his cloths and went out.",
		accepted: [{
			type: "replace",
			word: "cloths",
			to: "clothes"
		}],
		explanation: "'Cloth' is material. What we wear is 'clothes'.",
		headword: "clothes"
	},
	{
		id: "d-colour",
		paper: "drill",
		prompt: "His shirt was blue colour.",
		accepted: [{
			type: "delete",
			word: "colour"
		}],
		explanation: "Do not repeat 'colour' after a colour word.",
		headword: "colour"
	},
	{
		id: "d-comfort",
		paper: "drill",
		prompt: "This chair is not very comfort.",
		accepted: [{
			type: "replace",
			word: "comfort",
			to: "comfortable"
		}],
		explanation: "The adjective is 'comfortable'.",
		headword: "comfort"
	},
	{
		id: "d-contact",
		paper: "drill",
		prompt: "I shall contact with her about it.",
		accepted: [{
			type: "delete",
			word: "with"
		}],
		explanation: "'Contact' takes a direct object.",
		headword: "contact"
	},
	{
		id: "d-cooker",
		paper: "drill",
		prompt: "My mother is a good cooker.",
		accepted: [{
			type: "replace",
			word: "cooker",
			to: "cook"
		}],
		explanation: "A cooker is an appliance. A person is a cook.",
		headword: "cooker"
	},
	{
		id: "d-discuss",
		paper: "drill",
		prompt: "At the meeting they discussed about the problem.",
		accepted: [{
			type: "delete",
			word: "about"
		}],
		explanation: "'Discuss' already means 'talk about'.",
		headword: "discuss"
	},
	{
		id: "d-equipment",
		paper: "drill",
		prompt: "A lot of equipments are needed for science classes.",
		accepted: [{
			type: "replace",
			word: "equipments",
			to: "equipment"
		}, {
			type: "replace",
			word: "are",
			to: "is"
		}],
		explanation: "'Equipment' is uncountable.",
		headword: "equipment"
	},
	{
		id: "d-everyday",
		paper: "drill",
		prompt: "Paul listens to music everyday.",
		accepted: [{
			type: "replace",
			word: "everyday",
			to: "every day"
		}],
		explanation: "'Every day' (two words) is the adverbial. 'Everyday' is an adjective.",
		headword: "every day"
	},
	{
		id: "d-everybody",
		paper: "drill",
		prompt: "Everybody were frightened when the lights went out.",
		accepted: [{
			type: "replace",
			word: "were",
			to: "was"
		}],
		explanation: "'Everybody' takes a singular verb.",
		headword: "everybody"
	},
	{
		id: "d-evidence",
		paper: "drill",
		prompt: "There are evidences that Mr Brown took the money.",
		accepted: [{
			type: "replace",
			word: "evidences",
			to: "evidence"
		}, {
			type: "replace",
			word: "are",
			to: "is"
		}],
		explanation: "'Evidence' is uncountable.",
		headword: "evidence"
	},
	{
		id: "d-favourite",
		paper: "drill",
		prompt: "Tennis is my most favourite sport.",
		accepted: [{
			type: "delete",
			word: "most"
		}],
		explanation: "'Favourite' already means liked most.",
		headword: "favourite"
	},
	{
		id: "d-furniture",
		paper: "drill",
		prompt: "She bought a lot of furnitures for the flat.",
		accepted: [{
			type: "replace",
			word: "furnitures",
			to: "furniture"
		}],
		explanation: "'Furniture' is uncountable.",
		headword: "furniture"
	},
	{
		id: "d-happen",
		paper: "drill",
		prompt: "The accident was happened at 4.10 p.m.",
		accepted: [{
			type: "delete",
			word: "was"
		}],
		explanation: "'Happen' is not used in the passive.",
		headword: "happen"
	},
	{
		id: "d-hardly",
		paper: "drill",
		prompt: "She worked very hardly.",
		accepted: [{
			type: "replace",
			word: "hardly",
			to: "hard"
		}],
		explanation: "'Hard' = with effort. 'Hardly' = almost not.",
		headword: "hardly"
	},
	{
		id: "d-homework",
		paper: "drill",
		prompt: "I have a lot of homeworks tonight.",
		accepted: [{
			type: "replace",
			word: "homeworks",
			to: "homework"
		}],
		explanation: "'Homework' is never plural.",
		headword: "homework"
	},
	{
		id: "d-information",
		paper: "drill",
		prompt: "She got many informations before the journey.",
		accepted: [{
			type: "replace",
			word: "informations",
			to: "information"
		}],
		explanation: "'Information' is uncountable.",
		headword: "information"
	},
	{
		id: "d-lack",
		paper: "drill",
		prompt: "Hong Kong lacks of university places for all its good students.",
		accepted: [{
			type: "delete",
			word: "of"
		}],
		explanation: "The verb 'lack' takes a direct object.",
		headword: "lack"
	},
	{
		id: "d-lend",
		paper: "drill",
		prompt: "I lend a book from the library.",
		accepted: [{
			type: "replace",
			word: "lend",
			to: "borrowed"
		}],
		explanation: "You borrow from a library. You lend to a person.",
		headword: "lend"
	},
	{
		id: "d-listen",
		paper: "drill",
		prompt: "I like listening pop music.",
		accepted: [{
			type: "insert",
			word: "to",
			after: "listening"
		}],
		explanation: "'Listen to' takes 'to'.",
		headword: "listen"
	},
	{
		id: "d-make",
		paper: "drill",
		prompt: "His parents make him to study hard.",
		accepted: [{
			type: "delete",
			word: "to"
		}],
		explanation: "'Make' + object + bare infinitive.",
		headword: "make"
	},
	{
		id: "d-married",
		paper: "drill",
		prompt: "Cathy will marry with Paul soon.",
		accepted: [{
			type: "delete",
			word: "with"
		}],
		explanation: "'Marry' takes a direct object.",
		headword: "married"
	},
	{
		id: "d-more",
		paper: "drill",
		prompt: "Fruit is more cheaper from a hawker than in a shop.",
		accepted: [{
			type: "delete",
			word: "more"
		}],
		explanation: "Do not use 'more' together with '-er'.",
		headword: "more"
	},
	{
		id: "d-news",
		paper: "drill",
		prompt: "She passed her driving test — that's a good news!",
		accepted: [{
			type: "delete",
			word: "a"
		}, {
			type: "replace",
			word: "a",
			to: "some"
		}],
		explanation: "'News' cannot take 'a'.",
		headword: "news"
	},
	{
		id: "d-object",
		paper: "drill",
		prompt: "The manager objects my plan.",
		accepted: [{
			type: "insert",
			word: "to",
			after: "objects"
		}],
		explanation: "One objects to something.",
		headword: "object"
	},
	{
		id: "d-open",
		paper: "drill",
		prompt: "She came in and opened the television.",
		accepted: [{
			type: "replace",
			word: "opened",
			to: "turned on"
		}, {
			type: "replace",
			word: "opened",
			to: "switched on"
		}],
		explanation: "Turn on / switch on a television.",
		headword: "open"
	},
	{
		id: "d-reach-raise",
		paper: "drill",
		prompt: "Buy now — they will rise the price next week.",
		accepted: [{
			type: "replace",
			word: "rise",
			to: "raise"
		}],
		explanation: "'Raise' takes an object. Prices rise; shops raise prices.",
		headword: "rise"
	},
	{
		id: "d-staff",
		paper: "drill",
		prompt: "I asked a staff where Mr Leung's office was.",
		accepted: [{
			type: "insert",
			word: "member",
			after: "staff"
		}, {
			type: "replace",
			word: "staff",
			to: "staff member"
		}],
		explanation: "One person is a member of staff.",
		headword: "staff"
	},
	{
		id: "d-too",
		paper: "drill",
		prompt: "Doug can't go; Liz can't go too.",
		accepted: [{
			type: "replace",
			word: "too",
			to: "either"
		}],
		explanation: "Use 'either' after a negative.",
		headword: "too"
	},
	{
		id: "d-wait",
		paper: "drill",
		prompt: "She waited me at the Star Ferry.",
		accepted: [{
			type: "insert",
			word: "for",
			after: "waited"
		}],
		explanation: "Wait for someone.",
		headword: "wait"
	},
	{
		id: "d-vocabulary",
		paper: "drill",
		prompt: "This year I have learnt many vocabularies.",
		accepted: [{
			type: "replace",
			word: "vocabularies",
			to: "words"
		}],
		explanation: "Learn new words to increase your vocabulary.",
		headword: "vocabulary"
	},
	{
		id: "d-wear",
		paper: "drill",
		prompt: "At 7 a.m. I get up and wear my uniform.",
		accepted: [{
			type: "replace",
			word: "wear",
			to: "put on"
		}],
		explanation: "You put on a uniform in the morning and wear it during the day.",
		headword: "wear"
	},
	{
		id: "d-wish",
		paper: "drill",
		prompt: "I wish you will get good results in the exams.",
		accepted: [{
			type: "replace",
			word: "wish",
			to: "hope"
		}],
		explanation: "Use 'hope' for things that may really happen.",
		headword: "wish"
	},
	{
		id: "d-year",
		paper: "drill",
		prompt: "The Maks have a ten-years-old boy.",
		accepted: [{
			type: "replace",
			word: "ten-years-old",
			to: "ten-year-old"
		}],
		explanation: "Hyphenated age adjectives keep 'year' singular.",
		headword: "year"
	}
];
function questionsForHeadword(headword) {
	const key = headword.toLowerCase();
	return questions.filter((q) => q.headword.toLowerCase() === key);
}
//#endregion
export { questionsForHeadword as i, papers as n, questions as r, Badge as t };
