// gml_Object_industria3_Step_0  locals=2 args=0 len=1004
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 0
00000018: conv.i.v
0000001C: push.imm.e 0
00000020: conv.i.v
00000024: push.imm.e 127
00000028: conv.i.v
0000002C: call action_if_number(argc=3)
00000034: pop.v.v local.__b__
0000003C: push.local.v local.__b__
00000044: conv.v.b
00000048: bf 0x20ED600
0000004C: push.imm.e 0
00000050: conv.i.v
00000054: push.imm.e 1
00000058: conv.i.v
0000005C: push.v redder
00000064: call action_if_variable(argc=3)
0000006C: pop.v.v local.__b__
00000074: push.local.v local.__b__
0000007C: conv.v.b
00000080: bf 0x20ED600
00000084: push.imm.e 455
00000088: pushenv 0x20ED458
0000008C: push.imm.e 0
00000090: conv.i.v
00000094: push.imm.e 1
00000098: conv.i.v
0000009C: push.v night
000000A4: call action_if_variable(argc=3)
000000AC: pop.v.v local.__b__
000000B4: push.local.v local.__b__
000000BC: conv.v.b
000000C0: bf 0x20ED458
000000C4: b 0x20ED460
000000C8: popenv 0x40ED41C
000000CC: b 0x20ED464
000000D0: popenv 0x1CED460
000000D4: push.local.v local.__b__
000000DC: conv.v.b
000000E0: bf 0x20ED494
000000E4: push.imm.e 1
000000E8: conv.i.v
000000EC: push.i 16366009
000000F4: conv.i.v
000000F8: call action_sprite_color(argc=2)
00000100: popz
00000104: push.imm.e 455
00000108: pushenv 0x20ED4D8
0000010C: push.imm.e 0
00000110: conv.i.v
00000114: push.imm.e 1
00000118: conv.i.v
0000011C: push.v dawn
00000124: call action_if_variable(argc=3)
0000012C: pop.v.v local.__b__
00000134: push.local.v local.__b__
0000013C: conv.v.b
00000140: bf 0x20ED4D8
00000144: b 0x20ED4E0
00000148: popenv 0x40ED49C
0000014C: b 0x20ED4E4
00000150: popenv 0x1CED4E0
00000154: push.local.v local.__b__
0000015C: conv.v.b
00000160: bf 0x20ED514
00000164: push.imm.e 1
00000168: conv.i.v
0000016C: push.i 15201023
00000174: conv.i.v
00000178: call action_sprite_color(argc=2)
00000180: popz
00000184: push.imm.e 455
00000188: pushenv 0x20ED558
0000018C: push.imm.e 0
00000190: conv.i.v
00000194: push.imm.e 0
00000198: conv.i.v
0000019C: push.v dawn
000001A4: call action_if_variable(argc=3)
000001AC: pop.v.v local.__b__
000001B4: push.local.v local.__b__
000001BC: conv.v.b
000001C0: bf 0x20ED558
000001C4: b 0x20ED560
000001C8: popenv 0x40ED51C
000001CC: b 0x20ED564
000001D0: popenv 0x1CED560
000001D4: push.local.v local.__b__
000001DC: conv.v.b
000001E0: bf 0x20ED5F4
000001E4: push.imm.e 455
000001E8: pushenv 0x20ED5B8
000001EC: push.imm.e 0
000001F0: conv.i.v
000001F4: push.imm.e 0
000001F8: conv.i.v
000001FC: push.v night
00000204: call action_if_variable(argc=3)
0000020C: pop.v.v local.__b__
00000214: push.local.v local.__b__
0000021C: conv.v.b
00000220: bf 0x20ED5B8
00000224: b 0x20ED5C0
00000228: popenv 0x40ED57C
0000022C: b 0x20ED5C4
00000230: popenv 0x1CED5C0
00000234: push.local.v local.__b__
0000023C: conv.v.b
00000240: bf 0x20ED5F4
00000244: push.imm.e 1
00000248: conv.i.v
0000024C: push.i 16777215
00000254: conv.i.v
00000258: call action_sprite_color(argc=2)
00000260: popz
00000264: push.imm.e 0
00000268: pop.v.i redder
00000270: push.imm.e 3
00000274: conv.i.v
00000278: push.imm.e 0
0000027C: conv.i.v
00000280: push.v life
00000288: call action_if_variable(argc=3)
00000290: pop.v.v local.__b__
00000298: push.local.v local.__b__
000002A0: conv.v.b
000002A4: bf 0x20ED6DC
000002A8: push.imm.e 1
000002AC: conv.i.v
000002B0: call action_set_relative(argc=1)
000002B8: popz
000002BC: push.imm.e 0
000002C0: conv.i.v
000002C4: push.imm.e 0
000002C8: conv.i.v
000002CC: push.imm.e 451
000002D0: conv.i.v
000002D4: call action_create_object(argc=3)
000002DC: popz
000002E0: push.imm.e 0
000002E4: conv.i.v
000002E8: call action_set_relative(argc=1)
000002F0: popz
000002F4: push.imm.e 1
000002F8: conv.i.v
000002FC: call action_set_relative(argc=1)
00000304: popz
00000308: push.imm.e 0
0000030C: conv.i.v
00000310: push.imm.e 0
00000314: conv.i.v
00000318: push.imm.e 259
0000031C: conv.i.v
00000320: call action_create_object(argc=3)
00000328: popz
0000032C: push.imm.e 0
00000330: conv.i.v
00000334: call action_set_relative(argc=1)
0000033C: popz
00000340: call action_kill_object(argc=0)
00000348: popz
0000034C: push.imm.e 0
00000350: conv.i.v
00000354: push.imm.e 1
00000358: conv.i.v
0000035C: push.imm.e 127
00000360: conv.i.v
00000364: call action_if_number(argc=3)
0000036C: pop.v.v local.__b__
00000374: push.local.v local.__b__
0000037C: conv.v.b
00000380: bf 0x20ED768
00000384: push.imm.e 0
00000388: conv.i.v
0000038C: push.imm.e 1
00000390: conv.i.v
00000394: push.v redder
0000039C: call action_if_variable(argc=3)
000003A4: pop.v.v local.__b__
000003AC: push.local.v local.__b__
000003B4: conv.v.b
000003B8: bf 0x20ED768
000003BC: push.imm.e 1
000003C0: conv.i.v
000003C4: push.imm.e 255
000003C8: conv.i.v
000003CC: call action_sprite_color(argc=2)
000003D4: popz
000003D8: push.imm.e 0
000003DC: conv.i.v
000003E0: call action_set_relative(argc=1)
000003E8: popz