// gml_Object_impa3gru_Alarm_0  locals=1 args=0 len=956
// locals: arguments
00000000: push.v demos
00000008: push.imm.e 0
0000000C: cmp.i.v ==
00000010: bf 0x2145C14
00000014: push.v phase
0000001C: push.imm.e 1
00000020: cmp.i.v ==
00000024: bf 0x2145A80
00000028: push.imm.e 157
0000002C: pop.v.i sprite_index
00000034: push.v phase
0000003C: push.imm.e 1
00000040: add.i.v
00000044: pop.v.v phase
0000004C: push.imm.e 60
00000050: push.imm.e -1
00000054: push.imm.e 0
00000058: pop.v.i obj0.alarm[array]
00000060: exit
00000064: push.v phase
0000006C: push.imm.e 2
00000070: cmp.i.v ==
00000074: bf 0x2145AD0
00000078: push.imm.e 158
0000007C: pop.v.i sprite_index
00000084: push.v phase
0000008C: push.imm.e 1
00000090: add.i.v
00000094: pop.v.v phase
0000009C: push.imm.e 60
000000A0: push.imm.e -1
000000A4: push.imm.e 0
000000A8: pop.v.i obj0.alarm[array]
000000B0: exit
000000B4: push.v phase
000000BC: push.imm.e 3
000000C0: cmp.i.v ==
000000C4: bf 0x2145B20
000000C8: push.imm.e 159
000000CC: pop.v.i sprite_index
000000D4: push.v phase
000000DC: push.imm.e 1
000000E0: add.i.v
000000E4: pop.v.v phase
000000EC: push.imm.e 60
000000F0: push.imm.e -1
000000F4: push.imm.e 0
000000F8: pop.v.i obj0.alarm[array]
00000100: exit
00000104: push.v phase
0000010C: push.imm.e 4
00000110: cmp.i.v ==
00000114: bf 0x2145BA4
00000118: push.imm.e 160
0000011C: pop.v.i sprite_index
00000124: push.v phase
0000012C: push.imm.e 1
00000130: add.i.v
00000134: pop.v.v phase
0000013C: push.imm.e 60
00000140: push.imm.e -1
00000144: push.imm.e 0
00000148: pop.v.i obj0.alarm[array]
00000150: push.imm.e 489
00000154: conv.i.v
00000158: push.v y
00000160: push.imm.e 554
00000164: sub.i.v
00000168: push.v x
00000170: push.imm.e 94
00000174: add.i.v
00000178: call instance_create(argc=3)
00000180: popz
00000184: exit
00000188: push.v phase
00000190: push.imm.e 5
00000194: cmp.i.v ==
00000198: bf 0x2145C14
0000019C: push.imm.e 161
000001A0: pop.v.i sprite_index
000001A8: push.v phase
000001B0: push.imm.e 1
000001B4: add.i.v
000001B8: pop.v.v phase
000001C0: push.imm.e 490
000001C4: conv.i.v
000001C8: push.v y
000001D0: push.imm.e 809
000001D4: sub.i.v
000001D8: push.v x
000001E0: push.imm.e 145
000001E4: add.i.v
000001E8: call instance_create(argc=3)
000001F0: popz
000001F4: exit
000001F8: push.v demos
00000200: push.imm.e 1
00000204: cmp.i.v ==
00000208: bf 0x2145DD8
0000020C: push.v phase
00000214: push.imm.e 0
00000218: cmp.i.v ==
0000021C: bf 0x2145C48
00000220: call instance_destroy(argc=0)
00000228: popz
0000022C: push.v phase
00000234: push.imm.e 1
00000238: cmp.i.v ==
0000023C: bf 0x2145C98
00000240: push.imm.e 157
00000244: pop.v.i sprite_index
0000024C: push.v phase
00000254: push.imm.e 1
00000258: sub.i.v
0000025C: pop.v.v phase
00000264: push.imm.e 60
00000268: push.imm.e -1
0000026C: push.imm.e 0
00000270: pop.v.i obj0.alarm[array]
00000278: exit
0000027C: push.v phase
00000284: push.imm.e 2
00000288: cmp.i.v ==
0000028C: bf 0x2145CE8
00000290: push.imm.e 158
00000294: pop.v.i sprite_index
0000029C: push.v phase
000002A4: push.imm.e 1
000002A8: sub.i.v
000002AC: pop.v.v phase
000002B4: push.imm.e 60
000002B8: push.imm.e -1
000002BC: push.imm.e 0
000002C0: pop.v.i obj0.alarm[array]
000002C8: exit
000002CC: push.v phase
000002D4: push.imm.e 3
000002D8: cmp.i.v ==
000002DC: bf 0x2145D38
000002E0: push.imm.e 159
000002E4: pop.v.i sprite_index
000002EC: push.v phase
000002F4: push.imm.e 1
000002F8: sub.i.v
000002FC: pop.v.v phase
00000304: push.imm.e 60
00000308: push.imm.e -1
0000030C: push.imm.e 0
00000310: pop.v.i obj0.alarm[array]
00000318: exit
0000031C: push.v phase
00000324: push.imm.e 4
00000328: cmp.i.v ==
0000032C: bf 0x2145D88
00000330: push.imm.e 160
00000334: pop.v.i sprite_index
0000033C: push.v phase
00000344: push.imm.e 1
00000348: sub.i.v
0000034C: pop.v.v phase
00000354: push.imm.e 60
00000358: push.imm.e -1
0000035C: push.imm.e 0
00000360: pop.v.i obj0.alarm[array]
00000368: exit
0000036C: push.v phase
00000374: push.imm.e 5
00000378: cmp.i.v >=
0000037C: bf 0x2145DD8
00000380: push.imm.e 161
00000384: pop.v.i sprite_index
0000038C: push.v phase
00000394: push.imm.e 1
00000398: sub.i.v
0000039C: pop.v.v phase
000003A4: push.imm.e 60
000003A8: push.imm.e -1
000003AC: push.imm.e 0
000003B0: pop.v.i obj0.alarm[array]
000003B8: exit