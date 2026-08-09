// gml_Object_impagatlingr_Create_0  locals=2 args=0 len=744
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 455
00000018: pushenv 0x214D3B8
0000001C: push.imm.e 0
00000020: conv.i.v
00000024: push.imm.e 1
00000028: conv.i.v
0000002C: push.v night
00000034: call action_if_variable(argc=3)
0000003C: pop.v.v local.__b__
00000044: push.local.v local.__b__
0000004C: conv.v.b
00000050: bf 0x214D3B8
00000054: b 0x214D3C0
00000058: popenv 0x414D37C
0000005C: b 0x214D3C4
00000060: popenv 0x1D4D3C0
00000064: push.local.v local.__b__
0000006C: conv.v.b
00000070: bf 0x214D3F4
00000074: push.imm.e 1
00000078: conv.i.v
0000007C: push.i 16366009
00000084: conv.i.v
00000088: call action_sprite_color(argc=2)
00000090: popz
00000094: push.imm.e 455
00000098: pushenv 0x214D438
0000009C: push.imm.e 0
000000A0: conv.i.v
000000A4: push.imm.e 1
000000A8: conv.i.v
000000AC: push.v dawn
000000B4: call action_if_variable(argc=3)
000000BC: pop.v.v local.__b__
000000C4: push.local.v local.__b__
000000CC: conv.v.b
000000D0: bf 0x214D438
000000D4: b 0x214D440
000000D8: popenv 0x414D3FC
000000DC: b 0x214D444
000000E0: popenv 0x1D4D440
000000E4: push.local.v local.__b__
000000EC: conv.v.b
000000F0: bf 0x214D474
000000F4: push.imm.e 1
000000F8: conv.i.v
000000FC: push.i 15201023
00000104: conv.i.v
00000108: call action_sprite_color(argc=2)
00000110: popz
00000114: push.v y
0000011C: neg.v.d
00000120: push.imm.e 1
00000124: add.i.v
00000128: pop.v.v depth
00000130: push.imm.e 0
00000134: conv.i.v
00000138: push.imm.e 361
0000013C: conv.i.v
00000140: call action_set_alarm(argc=2)
00000148: popz
0000014C: push.imm.e 10
00000150: conv.i.v
00000154: push.imm.e 20
00000158: conv.i.v
0000015C: call action_set_alarm(argc=2)
00000164: popz
00000168: push.imm.e 1
0000016C: conv.i.v
00000170: call action_set_relative(argc=1)
00000178: popz
0000017C: push.imm.e 0
00000180: conv.i.v
00000184: push.imm.e 0
00000188: conv.i.v
0000018C: push.imm.e 513
00000190: conv.i.v
00000194: call action_create_object(argc=3)
0000019C: popz
000001A0: push.imm.e 0
000001A4: conv.i.v
000001A8: call action_set_relative(argc=1)
000001B0: popz
000001B4: push.imm.e 0
000001B8: pop.v.i tic
000001C0: push.imm.e 2
000001C4: conv.i.v
000001C8: call action_if_dice(argc=1)
000001D0: pop.v.v local.__b__
000001D8: push.local.v local.__b__
000001E0: conv.v.b
000001E4: bf 0x214D5C0
000001E8: push.imm.e 2
000001EC: conv.i.v
000001F0: call action_if_dice(argc=1)
000001F8: pop.v.v local.__b__
00000200: push.local.v local.__b__
00000208: conv.v.b
0000020C: bf 0x214D598
00000210: push.imm.e 1
00000214: conv.i.v
00000218: push.imm.e 0
0000021C: conv.i.v
00000220: push.imm.e 289
00000224: conv.i.v
00000228: call action_sprite_set(argc=3)
00000230: popz
00000234: b 0x214D5BC
00000238: push.imm.e 1
0000023C: conv.i.v
00000240: push.imm.e 0
00000244: conv.i.v
00000248: push.imm.e 290
0000024C: conv.i.v
00000250: call action_sprite_set(argc=3)
00000258: popz
0000025C: b 0x214D634
00000260: push.imm.e 2
00000264: conv.i.v
00000268: call action_if_dice(argc=1)
00000270: pop.v.v local.__b__
00000278: push.local.v local.__b__
00000280: conv.v.b
00000284: bf 0x214D610
00000288: push.imm.e 1
0000028C: conv.i.v
00000290: push.imm.e 0
00000294: conv.i.v
00000298: push.imm.e 291
0000029C: conv.i.v
000002A0: call action_sprite_set(argc=3)
000002A8: popz
000002AC: b 0x214D634
000002B0: push.imm.e 1
000002B4: conv.i.v
000002B8: push.imm.e 0
000002BC: conv.i.v
000002C0: push.imm.e 292
000002C4: conv.i.v
000002C8: call action_sprite_set(argc=3)
000002D0: popz
000002D4: push.imm.e 0
000002D8: conv.i.v
000002DC: call action_set_relative(argc=1)
000002E4: popz