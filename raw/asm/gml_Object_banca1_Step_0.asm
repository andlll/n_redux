// gml_Object_banca1_Step_0  locals=2 args=0 len=964
// locals: arguments, __b__
00000000: push.imm.e 1
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 0
00000018: conv.i.v
0000001C: push.imm.e 1
00000020: conv.i.v
00000024: push.imm.e 127
00000028: conv.i.v
0000002C: call action_if_number(argc=3)
00000034: pop.v.v local.__b__
0000003C: push.local.v local.__b__
00000044: conv.v.b
00000048: bf 0x20DB764
0000004C: push.imm.e 0
00000050: conv.i.v
00000054: push.imm.e 1
00000058: conv.i.v
0000005C: push.v redder
00000064: call action_if_variable(argc=3)
0000006C: pop.v.v local.__b__
00000074: push.local.v local.__b__
0000007C: conv.v.b
00000080: bf 0x20DB764
00000084: push.imm.e 1
00000088: conv.i.v
0000008C: push.imm.e 255
00000090: conv.i.v
00000094: call action_sprite_color(argc=2)
0000009C: popz
000000A0: push.imm.e 3
000000A4: conv.i.v
000000A8: push.imm.e 0
000000AC: conv.i.v
000000B0: push.v life
000000B8: call action_if_variable(argc=3)
000000C0: pop.v.v local.__b__
000000C8: push.local.v local.__b__
000000D0: conv.v.b
000000D4: bf 0x20DB7F0
000000D8: push.imm.e 0
000000DC: conv.i.v
000000E0: push.imm.e 0
000000E4: conv.i.v
000000E8: push.imm.e 451
000000EC: conv.i.v
000000F0: call action_create_object(argc=3)
000000F8: popz
000000FC: push.imm.e 0
00000100: conv.i.v
00000104: push.imm.e 0
00000108: conv.i.v
0000010C: push.imm.e 256
00000110: conv.i.v
00000114: call action_create_object(argc=3)
0000011C: popz
00000120: call action_kill_object(argc=0)
00000128: popz
0000012C: push.imm.e 0
00000130: conv.i.v
00000134: push.imm.e 0
00000138: conv.i.v
0000013C: push.imm.e 127
00000140: conv.i.v
00000144: call action_if_number(argc=3)
0000014C: pop.v.v local.__b__
00000154: push.local.v local.__b__
0000015C: conv.v.b
00000160: bf 0x20DBA74
00000164: push.imm.e 0
00000168: conv.i.v
0000016C: push.imm.e 1
00000170: conv.i.v
00000174: push.v redder
0000017C: call action_if_variable(argc=3)
00000184: pop.v.v local.__b__
0000018C: push.local.v local.__b__
00000194: conv.v.b
00000198: bf 0x20DBA74
0000019C: push.imm.e 455
000001A0: pushenv 0x20DB8A4
000001A4: push.imm.e 0
000001A8: conv.i.v
000001AC: push.imm.e 1
000001B0: conv.i.v
000001B4: push.v night
000001BC: call action_if_variable(argc=3)
000001C4: pop.v.v local.__b__
000001CC: push.local.v local.__b__
000001D4: conv.v.b
000001D8: bf 0x20DB8A4
000001DC: b 0x20DB8AC
000001E0: popenv 0x40DB868
000001E4: b 0x20DB8B0
000001E8: popenv 0x1CDB8AC
000001EC: push.local.v local.__b__
000001F4: conv.v.b
000001F8: bf 0x20DB8E0
000001FC: push.imm.e 1
00000200: conv.i.v
00000204: push.i 16366009
0000020C: conv.i.v
00000210: call action_sprite_color(argc=2)
00000218: popz
0000021C: push.imm.e 455
00000220: pushenv 0x20DB924
00000224: push.imm.e 0
00000228: conv.i.v
0000022C: push.imm.e 1
00000230: conv.i.v
00000234: push.v dawn
0000023C: call action_if_variable(argc=3)
00000244: pop.v.v local.__b__
0000024C: push.local.v local.__b__
00000254: conv.v.b
00000258: bf 0x20DB924
0000025C: b 0x20DB92C
00000260: popenv 0x40DB8E8
00000264: b 0x20DB930
00000268: popenv 0x1CDB92C
0000026C: push.local.v local.__b__
00000274: conv.v.b
00000278: bf 0x20DB960
0000027C: push.imm.e 1
00000280: conv.i.v
00000284: push.i 15201023
0000028C: conv.i.v
00000290: call action_sprite_color(argc=2)
00000298: popz
0000029C: push.imm.e 455
000002A0: pushenv 0x20DB9A4
000002A4: push.imm.e 0
000002A8: conv.i.v
000002AC: push.imm.e 0
000002B0: conv.i.v
000002B4: push.v dawn
000002BC: call action_if_variable(argc=3)
000002C4: pop.v.v local.__b__
000002CC: push.local.v local.__b__
000002D4: conv.v.b
000002D8: bf 0x20DB9A4
000002DC: b 0x20DB9AC
000002E0: popenv 0x40DB968
000002E4: b 0x20DB9B0
000002E8: popenv 0x1CDB9AC
000002EC: push.local.v local.__b__
000002F4: conv.v.b
000002F8: bf 0x20DBA40
000002FC: push.imm.e 455
00000300: pushenv 0x20DBA04
00000304: push.imm.e 0
00000308: conv.i.v
0000030C: push.imm.e 0
00000310: conv.i.v
00000314: push.v night
0000031C: call action_if_variable(argc=3)
00000324: pop.v.v local.__b__
0000032C: push.local.v local.__b__
00000334: conv.v.b
00000338: bf 0x20DBA04
0000033C: b 0x20DBA0C
00000340: popenv 0x40DB9C8
00000344: b 0x20DBA10
00000348: popenv 0x1CDBA0C
0000034C: push.local.v local.__b__
00000354: conv.v.b
00000358: bf 0x20DBA40
0000035C: push.imm.e 1
00000360: conv.i.v
00000364: push.i 16777215
0000036C: conv.i.v
00000370: call action_sprite_color(argc=2)
00000378: popz
0000037C: push.imm.e 0
00000380: conv.i.v
00000384: call action_set_relative(argc=1)
0000038C: popz
00000390: push.imm.e 0
00000394: pop.v.i redder
0000039C: push.imm.e 1
000003A0: conv.i.v
000003A4: call action_set_relative(argc=1)
000003AC: popz
000003B0: push.imm.e 0
000003B4: conv.i.v
000003B8: call action_set_relative(argc=1)
000003C0: popz