// gml_Object_bombar_Step_0  locals=2 args=0 len=972
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 3
00000018: conv.i.v
0000001C: push.imm.e 0
00000020: conv.i.v
00000024: push.v life
0000002C: call action_if_variable(argc=3)
00000034: pop.v.v local.__b__
0000003C: push.local.v local.__b__
00000044: conv.v.b
00000048: bf 0x20B1730
0000004C: push.imm.e 0
00000050: conv.i.v
00000054: push.imm.e 0
00000058: conv.i.v
0000005C: push.v piro
00000064: call action_if_variable(argc=3)
0000006C: pop.v.v local.__b__
00000074: push.local.v local.__b__
0000007C: conv.v.b
00000080: bf 0x20B1730
00000084: push.imm.e 1
00000088: pop.v.i piro
00000090: push.imm.e 6
00000094: conv.i.v
00000098: push.imm.e 8
0000009C: conv.i.v
000000A0: call action_set_alarm(argc=2)
000000A8: popz
000000AC: push.imm.e 7
000000B0: conv.i.v
000000B4: push.imm.e 10
000000B8: conv.i.v
000000BC: call action_set_motion(argc=2)
000000C4: popz
000000C8: push.imm.e 1
000000CC: conv.i.v
000000D0: push.imm.e 20
000000D4: conv.i.v
000000D8: call action_set_alarm(argc=2)
000000E0: popz
000000E4: push.imm.e 2
000000E8: conv.i.v
000000EC: call action_if_dice(argc=1)
000000F4: pop.v.v local.__b__
000000FC: push.local.v local.__b__
00000104: conv.v.b
00000108: bf 0x20B1590
0000010C: push.imm.e 1
00000110: conv.i.v
00000114: call action_set_relative(argc=1)
0000011C: popz
00000120: push.imm.e 0
00000124: conv.i.v
00000128: push.imm.e 0
0000012C: conv.i.v
00000130: push.imm.e 606
00000134: conv.i.v
00000138: call action_create_object(argc=3)
00000140: popz
00000144: push.imm.e 0
00000148: conv.i.v
0000014C: call action_set_relative(argc=1)
00000154: popz
00000158: push.imm.e 1
0000015C: conv.i.v
00000160: call action_set_relative(argc=1)
00000168: popz
0000016C: push.imm.e 40
00000170: conv.i.v
00000174: push.imm.e 70
00000178: conv.i.v
0000017C: push.imm.e 79
00000180: conv.i.v
00000184: call action_create_object(argc=3)
0000018C: popz
00000190: push.imm.e 0
00000194: conv.i.v
00000198: call action_set_relative(argc=1)
000001A0: popz
000001A4: push.imm.e 1
000001A8: conv.i.v
000001AC: call action_set_relative(argc=1)
000001B4: popz
000001B8: push.imm.e -40
000001BC: conv.i.v
000001C0: push.imm.e -70
000001C4: conv.i.v
000001C8: push.imm.e 80
000001CC: conv.i.v
000001D0: call action_create_object(argc=3)
000001D8: popz
000001DC: push.imm.e 0
000001E0: conv.i.v
000001E4: call action_set_relative(argc=1)
000001EC: popz
000001F0: push.imm.e 1
000001F4: conv.i.v
000001F8: push.imm.e 0
000001FC: conv.i.v
00000200: push.imm.e 260
00000204: conv.i.v
00000208: call action_sprite_set(argc=3)
00000210: popz
00000214: b 0x20B1730
00000218: push.imm.e 1
0000021C: conv.i.v
00000220: call action_set_relative(argc=1)
00000228: popz
0000022C: push.imm.e 0
00000230: conv.i.v
00000234: push.imm.e 0
00000238: conv.i.v
0000023C: push.imm.e 606
00000240: conv.i.v
00000244: call action_create_object(argc=3)
0000024C: popz
00000250: push.imm.e 0
00000254: conv.i.v
00000258: call action_set_relative(argc=1)
00000260: popz
00000264: push.imm.e 1
00000268: conv.i.v
0000026C: call action_set_relative(argc=1)
00000274: popz
00000278: push.imm.e -40
0000027C: conv.i.v
00000280: push.imm.e -70
00000284: conv.i.v
00000288: push.imm.e 81
0000028C: conv.i.v
00000290: call action_create_object(argc=3)
00000298: popz
0000029C: push.imm.e 0
000002A0: conv.i.v
000002A4: call action_set_relative(argc=1)
000002AC: popz
000002B0: push.imm.e 1
000002B4: conv.i.v
000002B8: call action_set_relative(argc=1)
000002C0: popz
000002C4: push.imm.e 40
000002C8: conv.i.v
000002CC: push.imm.e 70
000002D0: conv.i.v
000002D4: push.imm.e 82
000002D8: conv.i.v
000002DC: call action_create_object(argc=3)
000002E4: popz
000002E8: push.imm.e 0
000002EC: conv.i.v
000002F0: call action_set_relative(argc=1)
000002F8: popz
000002FC: push.imm.e 1
00000300: conv.i.v
00000304: call action_set_relative(argc=1)
0000030C: popz
00000310: push.imm.e 100
00000314: conv.i.v
00000318: push.imm.e -170
0000031C: conv.i.v
00000320: push.imm.e 83
00000324: conv.i.v
00000328: call action_create_object(argc=3)
00000330: popz
00000334: push.imm.e 0
00000338: conv.i.v
0000033C: call action_set_relative(argc=1)
00000344: popz
00000348: push.imm.e 1
0000034C: conv.i.v
00000350: call action_set_relative(argc=1)
00000358: popz
0000035C: push.imm.e 100
00000360: conv.i.v
00000364: push.imm.e -170
00000368: conv.i.v
0000036C: push.imm.e 84
00000370: conv.i.v
00000374: call action_create_object(argc=3)
0000037C: popz
00000380: push.imm.e 0
00000384: conv.i.v
00000388: call action_set_relative(argc=1)
00000390: popz
00000394: push.imm.e 1
00000398: conv.i.v
0000039C: push.imm.e 0
000003A0: conv.i.v
000003A4: push.imm.e 261
000003A8: conv.i.v
000003AC: call action_sprite_set(argc=3)
000003B4: popz
000003B8: push.imm.e 0
000003BC: conv.i.v
000003C0: call action_set_relative(argc=1)
000003C8: popz