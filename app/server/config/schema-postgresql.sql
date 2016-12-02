create table nakama.account (
    id serial primary key,
    username text not null,
    password text not null,
    email text not null,
    role text not null default 'author',
    enabled boolean not null default TRUE,
    createdat timestamp with time zone not null default now(),
    unique (username)
);

create table nakama.category (
    id serial primary key,
    name text not null,
    createdat timestamp with time zone not null default now(),
    unique (name)
);

create table nakama.message (
    id serial primary key,
    title text not null,
    body text not null,
    bodyhtml text,
    published boolean not null default FALSE,
    authorname text not null,
    authorid integer,
    prettyurl text not null,
    createdat timestamp with time zone not null default now(),
    updatedat timestamp with time zone,
    categories jsonb,
    constraint fk_message_accountid foreign key (authorid) references account (id)
);

create table nakama.comment (
    id serial primary key,
    body text not null,
    approved boolean not null default TRUE,
    authorname text not null,
    authorid integer,
    messageid integer,
    createdat timestamp with time zone not null default now(),
    constraint fk_comment_messageid foreign key (messageid) references message (id),
    constraint fk_message_accountid foreign key (authorid) references account (id)
);

create table nakama.file (
    id serial primary key,
    name text not null,
    filepath text not null,
    contenttype text not null default 'application/octet-stream',
    ownerid integer not null,
    ownername text not null,
    ispublic boolean not null default TRUE,
    createdat timestamp with time zone not null default now(),
    constraint fk_file_accountid foreign key (ownerid) references account (id)
);


create table nakama.statistics (
    id serial primary key,
    tablename text not null,
    statistic text not null,
    value text not null,
    createdat timestamp with time zone not null default now(),
    updatedat timestamp with time zone,
    unique(tablename, statistic)
);

-- Basic stats
insert into nakama.statistics(tablename, statistic, value) values('file', 'total_count', '0');
insert into nakama.statistics(tablename, statistic, value) values('message', 'total_count', '0');
insert into nakama.statistics(tablename, statistic, value) values('comment', 'total_count', '0');
