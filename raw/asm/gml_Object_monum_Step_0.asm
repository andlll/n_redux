// gml_Object_monum_Step_0  locals=2 args=0 len=824
// locals: arguments, __b__
00000000: push.imm.e 1
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
00000048: bf 0x20D5138
0000004C: push.imm.e 0
00000050: conv.i.v
00000054: push.imm.e 0
00000058: conv.i.v
0000005C: push.imm.e 449
00000060: conv.i.v
00000064: call action_create_object(argc=3)
0000006C: popz
00000070: push.imm.e 0
00000074: conv.i.v
00000078: push.imm.e 0
0000007C: conv.i.v
00000080: push.imm.e 249
00000084: conv.i.v
00000088: call action_create_object(argc=3)
00000090: popz
00000094: call action_kill_object(argc=0)
0000009C: popz
000000A0: push.imm.e 0
000000A4: conv.i.v
000000A8: push.imm.e 0
000000AC: conv.i.v
000000B0: push.imm.e 127
000000B4: conv.i.v
000000B8: call action_if_number(argc=3)
000000C0: pop.v.v local.__b__
000000C8: push.local.v local.__b__
000000D0: conv.v.b
000000D4: bf 0x20D53BC
000000D8: push.imm.e 0
000000DC: conv.i.v
000000E0: push.imm.e 1
000000E4: conv.i.v
000000E8: push.v redder
000000F0: call action_if_variable(argc=3)
000000F8: pop.v.v local.__b__
00000100: push.local.v local.__b__
00000108: conv.v.b
0000010C: bf 0x20D53BC
00000110: push.imm.e 455
00000114: pushenv 0x20D51EC
00000118: push.imm.e 0
0000011C: conv.i.v
00000120: push.imm.e 1
00000124: conv.i.v
00000128: push.v night
00000130: call action_if_variable(argc=3)
00000138: pop.v.v local.__b__
00000140: push.local.v local.__b__
00000148: conv.v.b
0000014C: bf 0x20D51EC
00000150: b 0x20D51F4
00000154: popenv 0x40D51B0
00000158: b 0x20D51F8
0000015C: popenv 0x1CD51F4
00000160: push.local.v local.__b__
00000168: conv.v.b
0000016C: bf 0x20D5228
00000170: push.imm.e 1
00000174: conv.i.v
00000178: push.i 16366009
00000180: conv.i.v
00000184: call action_sprite_color(argc=2)
0000018C: popz
00000190: push.imm.e 455
00000194: pushenv 0x20D526C
00000198: push.imm.e 0
0000019C: conv.i.v
000001A0: push.imm.e 1
000001A4: conv.i.v
000001A8: push.v dawn
000001B0: call action_if_variable(argc=3)
000001B8: pop.v.v local.__b__
000001C0: push.local.v local.__b__
000001C8: conv.v.b
000001CC: bf 0x20D526C
000001D0: b 0x20D5274
000001D4: popenv 0x40D5230
000001D8: b 0x20D5278
000001DC: popenv 0x1CD5274
000001E0: push.local.v local.__b__
000001E8: conv.v.b
000001EC: bf 0x20D52A8
000001F0: push.imm.e 1
000001F4: conv.i.v
000001F8: push.i 15201023
00000200: conv.i.v
00000204: call action_sprite_color(argc=2)
0000020C: popz
00000210: push.imm.e 455
00000214: pushenv 0x20D52EC
00000218: push.imm.e 0
0000021C: conv.i.v
00000220: push.imm.e 0
00000224: conv.i.v
00000228: push.v dawn
00000230: call action_if_variable(argc=3)
00000238: pop.v.v local.__b__
00000240: push.local.v local.__b__
00000248: conv.v.b
0000024C: bf 0x20D52EC
00000250: b 0x20D52F4
00000254: popenv 0x40D52B0
00000258: b 0x20D52F8
0000025C: popenv 0x1CD52F4
00000260: push.local.v local.__b__
00000268: conv.v.b
0000026C: bf 0x20D5388
00000270: push.imm.e 455
00000274: pushenv 0x20D534C
00000278: push.imm.e 0
0000027C: conv.i.v
00000280: push.imm.e 0
00000284: conv.i.v
00000288: push.v night
00000290: call action_if_variable(argc=3)
00000298: pop.v.v local.__b__
000002A0: push.local.v local.__b__
000002A8: conv.v.b
000002AC: bf 0x20D534C
000002B0: b 0x20D5354
000002B4: popenv 0x40D5310
000002B8: b 0x20D5358
000002BC: popenv 0x1CD5354
000002C0: push.local.v local.__b__
000002C8: conv.v.b
000002CC: bf 0x20D5388
000002D0: push.imm.e 1
000002D4: conv.i.v
000002D8: push.i 16777215
000002E0: conv.i.v
000002E4: call action_sprite_color(argc=2)
000002EC: popz
000002F0: push.imm.e 0
000002F4: conv.i.v
000002F8: call action_set_relative(argc=1)
00000300: popz
00000304: push.imm.e 0
00000308: pop.v.i redder
00000310: push.imm.e 1
00000314: conv.i.v
00000318: call action_set_relative(argc=1)
00000320: popz
00000324: push.imm.e 0
00000328: conv.i.v
0000032C: call action_set_relative(argc=1)
00000334: popz