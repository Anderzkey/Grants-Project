--
-- PostgreSQL database dump
--

-- Dumped from database version 14.16 (Homebrew)
-- Dumped by pg_dump version 14.16 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: grants; Type: TABLE DATA; Schema: public; Owner: andrejzadoroznyj
--

COPY public.grants (id, title, description, amount) FROM stdin;
1	Research Grant	Funding for scientific research	10000.00
2	Research	Funding for celss scientific research	10000.00
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: andrejzadoroznyj
--

COPY public.users (id, name, email, password_hash) FROM stdin;
2	Jay	jay@example.com	hashed_password_2
4	Alice Smith	asmith@example.com	new_hashed_password
5	John Doe	john@example.com	hashed_securepassword123
1	Alice	alice@example.com	$2a$10$7PeJUgj50IB0TWWLQqeyXeg1Wc3hSValuvyvcp.shALSIdGo2zKMK
\.


--
-- Name: grants_id_seq; Type: SEQUENCE SET; Schema: public; Owner: andrejzadoroznyj
--

SELECT pg_catalog.setval('public.grants_id_seq', 2, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: andrejzadoroznyj
--

SELECT pg_catalog.setval('public.users_id_seq', 7, true);


--
-- PostgreSQL database dump complete
--

