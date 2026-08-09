/// gml_Object_impa3gru2_Alarm_0
if (rota == 0) {
    if (phase == 1) {
        phase = phase + 1;
        sprite_index = 169;
        alarm[0] = 10;
        exit;
    }
    if (phase == 2) {
        phase = phase + 1;
        sprite_index = 170;
        alarm[0] = 10;
        exit;
    }
    if (phase == 3) {
        phase = phase + 1;
        sprite_index = 171;
        alarm[0] = 10;
        exit;
    }
    if (phase == 4) {
        phase = phase + 1;
        sprite_index = 172;
        alarm[0] = 10;
        exit;
    }
    if (phase == 5) {
        sprite_index = 173;
        alarm[0] = 120;
        rota = 1;
        exit;
    }
} else {
    if (phase == 1) {
        sprite_index = 168;
        alarm[0] = 120;
        rota = 0;
        exit;
    }
    if (phase == 2) {
        phase = phase - 1;
        sprite_index = 169;
        alarm[0] = 10;
        exit;
    }
    if (phase == 3) {
        phase = phase - 1;
        sprite_index = 170;
        alarm[0] = 10;
        exit;
    }
    if (phase == 4) {
        phase = phase - 1;
        sprite_index = 171;
        alarm[0] = 10;
        exit;
    }
    if (phase == 5) {
        phase = phase - 1;
        sprite_index = 172;
        alarm[0] = 120;
    }
}
