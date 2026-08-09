// gml_Object_club1_Step_0  locals=2 args=0 len=1004
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
00000048: bf 0x20E9DF0
0000004C: push.imm.e 0
00000050: conv.i.v
00000054: push.imm.e 1
00000058: conv.i.v
0000005C: push.v redder
00000064: call action_if_variable(argc=3)
0000006C: pop.v.v local.__b__
00000074: push.local.v local.__b__
0000007C: conv.v.b
00000080: bf 0x20E9DF0
00000084: push.imm.e 455
00000088: pushenv 0x20E9C48
0000008C: push.imm.e 0
00000090: conv.i.v
00000094: push.imm.e 1
00000098: conv.i.v
0000009C: push.v night
000000A4: call action_if_variable(argc=3)
000000AC: pop.v.v local.__b__
000000B4: push.local.v local.__b__
000000BC: conv.v.b
000000C0: bf 0x20E9C48
000000C4: b 0x20E9C50
000000C8: popenv 0x40E9C0C
000000CC: b 0x20E9C54
000000D0: popenv 0x1CE9C50
000000D4: push.local.v local.__b__
000000DC: conv.v.b
000000E0: bf 0x20E9C84
000000E4: push.imm.e 1
000000E8: conv.i.v
000000EC: push.i 16366009
000000F4: conv.i.v
000000F8: call action_sprite_color(argc=2)
00000100: popz
00000104: push.imm.e 455
00000108: pushenv 0x20E9CC8
0000010C: push.imm.e 0
00000110: conv.i.v
00000114: push.imm.e 1
00000118: conv.i.v
0000011C: push.v dawn
00000124: call action_if_variable(argc=3)
0000012C: pop.v.v local.__b__
00000134: push.local.v local.__b__
0000013C: conv.v.b
00000140: bf 0x20E9CC8
00000144: b 0x20E9CD0
00000148: popenv 0x40E9C8C
0000014C: b 0x20E9CD4
00000150: popenv 0x1CE9CD0
00000154: push.local.v local.__b__
0000015C: conv.v.b
00000160: bf 0x20E9D04
00000164: push.imm.e 1
00000168: conv.i.v
0000016C: push.i 15201023
00000174: conv.i.v
00000178: call action_sprite_color(argc=2)
00000180: popz
00000184: push.imm.e 455
00000188: pushenv 0x20E9D48
0000018C: push.imm.e 0
00000190: conv.i.v
00000194: push.imm.e 0
00000198: conv.i.v
0000019C: push.v dawn
000001A4: call action_if_variable(argc=3)
000001AC: pop.v.v local.__b__
000001B4: push.local.v local.__b__
000001BC: conv.v.b
000001C0: bf 0x20E9D48
000001C4: b 0x20E9D50
000001C8: popenv 0x40E9D0C
000001CC: b 0x20E9D54
000001D0: popenv 0x1CE9D50
000001D4: push.local.v local.__b__
000001DC: conv.v.b
000001E0: bf 0x20E9DE4
000001E4: push.imm.e 455
000001E8: pushenv 0x20E9DA8
000001EC: push.imm.e 0
000001F0: conv.i.v
000001F4: push.imm.e 0
000001F8: conv.i.v
000001FC: push.v night
00000204: call action_if_variable(argc=3)
0000020C: pop.v.v local.__b__
00000214: push.local.v local.__b__
0000021C: conv.v.b
00000220: bf 0x20E9DA8
00000224: b 0x20E9DB0
00000228: popenv 0x40E9D6C
0000022C: b 0x20E9DB4
00000230: popenv 0x1CE9DB0
00000234: push.local.v local.__b__
0000023C: conv.v.b
00000240: bf 0x20E9DE4
00000244: push.imm.e 1
00000248: conv.i.v
0000024C: push.i 16777215
00000254: conv.i.v
00000258: call action_sprite_color(argc=2)
00000260: popz
00000264: push.imm.e 0
00000268: pop.v.i redder
00000270: push.imm.e 0
00000274: conv.i.v
00000278: push.imm.e 1
0000027C: conv.i.v
00000280: push.imm.e 127
00000284: conv.i.v
00000288: call action_if_number(argc=3)
00000290: pop.v.v local.__b__
00000298: push.local.v local.__b__
000002A0: conv.v.b
000002A4: bf 0x20E9E7C
000002A8: push.imm.e 0
000002AC: conv.i.v
000002B0: push.imm.e 1
000002B4: conv.i.v
000002B8: push.v redder
000002C0: call action_if_variable(argc=3)
000002C8: pop.v.v local.__b__
000002D0: push.local.v local.__b__
000002D8: conv.v.b
000002DC: bf 0x20E9E7C
000002E0: push.imm.e 1
000002E4: conv.i.v
000002E8: push.imm.e 255
000002EC: conv.i.v
000002F0: call action_sprite_color(argc=2)
000002F8: popz
000002FC: push.imm.e 3
00000300: conv.i.v
00000304: push.imm.e 0
00000308: conv.i.v
0000030C: push.v life
00000314: call action_if_variable(argc=3)
0000031C: pop.v.v local.__b__
00000324: push.local.v local.__b__
0000032C: conv.v.b
00000330: bf 0x20E9F58
00000334: push.imm.e 1
00000338: conv.i.v
0000033C: call action_set_relative(argc=1)
00000344: popz
00000348: push.imm.e 0
0000034C: conv.i.v
00000350: push.imm.e 0
00000354: conv.i.v
00000358: push.imm.e 447
0000035C: conv.i.v
00000360: call action_create_object(argc=3)
00000368: popz
0000036C: push.imm.e 0
00000370: conv.i.v
00000374: call action_set_relative(argc=1)
0000037C: popz
00000380: push.imm.e 1
00000384: conv.i.v
00000388: call action_set_relative(argc=1)
00000390: popz
00000394: push.imm.e 0
00000398: conv.i.v
0000039C: push.imm.e 0
000003A0: conv.i.v
000003A4: push.imm.e 243
000003A8: conv.i.v
000003AC: call action_create_object(argc=3)
000003B4: popz
000003B8: push.imm.e 0
000003BC: conv.i.v
000003C0: call action_set_relative(argc=1)
000003C8: popz
000003CC: call action_kill_object(argc=0)
000003D4: popz
000003D8: push.imm.e 0
000003DC: conv.i.v
000003E0: call action_set_relative(argc=1)
000003E8: popz