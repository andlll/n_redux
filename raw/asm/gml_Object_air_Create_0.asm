// gml_Object_air_Create_0  locals=2 args=0 len=764
// locals: arguments, __b__
00000000: push.imm.e 5
00000004: conv.i.v
00000008: push.imm.e 45
0000000C: conv.i.v
00000010: call action_set_alarm(argc=2)
00000018: popz
0000001C: push.imm.e 2
00000020: pop.v.i life
00000028: push.imm.e 0
0000002C: pop.v.i piro
00000034: push.imm.e 0
00000038: pop.v.i col
00000040: push.imm.e 2
00000044: conv.i.v
00000048: call action_if_dice(argc=1)
00000050: pop.v.v local.__b__
00000058: push.local.v local.__b__
00000060: conv.v.b
00000064: bf 0x20B048C
00000068: push.imm.e 16
0000006C: conv.i.v
00000070: push.imm.e 30
00000074: conv.i.v
00000078: call action_set_motion(argc=2)
00000080: popz
00000084: b 0x20B04A8
00000088: push.imm.e 13
0000008C: conv.i.v
00000090: push.imm.e 30
00000094: conv.i.v
00000098: call action_set_motion(argc=2)
000000A0: popz
000000A4: push.imm.e 2
000000A8: conv.i.v
000000AC: call action_if_dice(argc=1)
000000B4: pop.v.v local.__b__
000000BC: push.local.v local.__b__
000000C4: conv.v.b
000000C8: bf 0x20B04EC
000000CC: push.imm.e -3990
000000D0: pop.v.i depth
000000D8: push.imm.e 1
000000DC: pop.v.i desto
000000E4: b 0x20B0540
000000E8: push.imm.e 2
000000EC: pop.v.i depth
000000F4: push.imm.e 0
000000F8: conv.i.v
000000FC: push.imm.e 0
00000100: conv.i.v
00000104: push.d 0.75
00000110: conv.d.v
00000114: push.d 0.75
00000120: conv.d.v
00000124: call action_sprite_transform(argc=4)
0000012C: popz
00000130: push.imm.e 0
00000134: pop.v.i desto
0000013C: push.imm.e 455
00000140: pushenv 0x20B0584
00000144: push.imm.e 0
00000148: conv.i.v
0000014C: push.imm.e 1
00000150: conv.i.v
00000154: push.v night
0000015C: call action_if_variable(argc=3)
00000164: pop.v.v local.__b__
0000016C: push.local.v local.__b__
00000174: conv.v.b
00000178: bf 0x20B0584
0000017C: b 0x20B058C
00000180: popenv 0x40B0548
00000184: b 0x20B0590
00000188: popenv 0x1CB058C
0000018C: push.local.v local.__b__
00000194: conv.v.b
00000198: bf 0x20B05C0
0000019C: push.imm.e 1
000001A0: conv.i.v
000001A4: push.i 16366009
000001AC: conv.i.v
000001B0: call action_sprite_color(argc=2)
000001B8: popz
000001BC: push.imm.e 0
000001C0: conv.i.v
000001C4: push.imm.e 40
000001C8: conv.i.v
000001CC: call action_set_alarm(argc=2)
000001D4: popz
000001D8: push.imm.e 1
000001DC: conv.i.v
000001E0: push.imm.e 3000
000001E4: conv.i.v
000001E8: call action_set_alarm(argc=2)
000001F0: popz
000001F4: push.imm.e 3
000001F8: conv.i.v
000001FC: call action_if_dice(argc=1)
00000204: pop.v.v local.__b__
0000020C: push.local.v local.__b__
00000214: conv.v.b
00000218: bf 0x20B0650
0000021C: push.imm.e 1
00000220: conv.i.v
00000224: push.imm.e 0
00000228: conv.i.v
0000022C: push.imm.e 1013
00000230: conv.i.v
00000234: call action_sprite_set(argc=3)
0000023C: popz
00000240: push.imm.e 1
00000244: pop.v.i col
0000024C: push.imm.e 3
00000250: conv.i.v
00000254: call action_if_dice(argc=1)
0000025C: pop.v.v local.__b__
00000264: push.local.v local.__b__
0000026C: conv.v.b
00000270: bf 0x20B06A8
00000274: push.imm.e 1
00000278: conv.i.v
0000027C: push.imm.e 0
00000280: conv.i.v
00000284: push.imm.e 1014
00000288: conv.i.v
0000028C: call action_sprite_set(argc=3)
00000294: popz
00000298: push.imm.e 2
0000029C: pop.v.i col
000002A4: push.imm.e 3
000002A8: conv.i.v
000002AC: call action_if_dice(argc=1)
000002B4: pop.v.v local.__b__
000002BC: push.local.v local.__b__
000002C4: conv.v.b
000002C8: bf 0x20B0700
000002CC: push.imm.e 1
000002D0: conv.i.v
000002D4: push.imm.e 0
000002D8: conv.i.v
000002DC: push.imm.e 1015
000002E0: conv.i.v
000002E4: call action_sprite_set(argc=3)
000002EC: popz
000002F0: push.imm.e 3
000002F4: pop.v.i col