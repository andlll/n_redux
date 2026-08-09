/// gml_Object_monspi_Alarm_0
action_set_relative(0);
with (r12) {
    arma = 1;
}
with (r12) {
    action_set_relative(1);
    onda = onda + 1;
    action_set_relative(0);
}
with (r12) {
    action_set_relative(1);
    bombolo = bombolo + 1;
    action_set_relative(0);
}
with (r12) {
    action_set_relative(1);
    dirox = dirox + 1;
    action_set_relative(0);
}
with (r12) {
    ondan = onda;
}
with (r12) {
    bombn = bombus;
}
with (r12) {
    diron = diro;
}
action_create_object(aincom, 960, 200);
action_kill_object();
action_set_relative(0);
