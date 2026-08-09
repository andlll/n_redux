/// gml_Object_impa3gru_Alarm_0
if (demos == 0) {
    if (phase == 1) {
        sprite_index = 157;
        phase = phase + 1;
        alarm[0] = 60;
        exit;
    }
    if (phase == 2) {
        sprite_index = 158;
        phase = phase + 1;
        alarm[0] = 60;
        exit;
    }
    if (phase == 3) {
        sprite_index = 159;
        phase = phase + 1;
        alarm[0] = 60;
        exit;
    }
    if (phase == 4) {
        sprite_index = 160;
        phase = phase + 1;
        alarm[0] = 60;
        instance_create(x + 94, y - 554, impa3gru1);
        exit;
    }
    if (phase == 5) {
        sprite_index = 161;
        phase = phase + 1;
        instance_create(x + 145, y - 809, impa3gru2);
        exit;
    }
}
if (demos == 1) {
    if (phase == 0) {
        instance_destroy();
    }
    if (phase == 1) {
        sprite_index = 157;
        phase = phase - 1;
        alarm[0] = 60;
        exit;
    }
    if (phase == 2) {
        sprite_index = 158;
        phase = phase - 1;
        alarm[0] = 60;
        exit;
    }
    if (phase == 3) {
        sprite_index = 159;
        phase = phase - 1;
        alarm[0] = 60;
        exit;
    }
    if (phase == 4) {
        sprite_index = 160;
        phase = phase - 1;
        alarm[0] = 60;
        exit;
    }
    if (phase >= 5) {
        sprite_index = 161;
        phase = phase - 1;
        alarm[0] = 60;
        exit;
    }
}
