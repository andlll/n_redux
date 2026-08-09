// gml_Object_industria2_Step_0  locals=2 args=0 len=1164
// locals: arguments, __b__
00000000: push.imm.e 1
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 0
00000018: conv.i.v
0000001C: push.imm.e 0
00000020: conv.i.v
00000024: push.v upo
0000002C: call action_if_variable(argc=3)
00000034: pop.v.v local.__b__
0000003C: push.local.v local.__b__
00000044: conv.v.b
00000048: bf 0x20EC2E4
0000004C: push.imm.e 4
00000050: conv.i.v
00000054: push.imm.e 1000
00000058: conv.i.v
0000005C: push.v makee
00000064: call action_if_variable(argc=3)
0000006C: pop.v.v local.__b__
00000074: push.local.v local.__b__
0000007C: conv.v.b
00000080: bf 0x20EC2E4
00000084: push.imm.e 0
00000088: conv.i.v
0000008C: push.imm.e 0
00000090: conv.i.v
00000094: push.imm.e 230
00000098: conv.i.v
0000009C: call action_create_object(argc=3)
000000A4: popz
000000A8: push.imm.e 0
000000AC: conv.i.v
000000B0: call action_set_relative(argc=1)
000000B8: popz
000000BC: push.imm.e 1
000000C0: pop.v.i upo
000000C8: push.imm.e 1
000000CC: conv.i.v
000000D0: call action_set_relative(argc=1)
000000D8: popz
000000DC: push.imm.e 3
000000E0: conv.i.v
000000E4: push.imm.e 0
000000E8: conv.i.v
000000EC: push.v life
000000F4: call action_if_variable(argc=3)
000000FC: pop.v.v local.__b__
00000104: push.local.v local.__b__
0000010C: conv.v.b
00000110: bf 0x20EC370
00000114: push.imm.e 0
00000118: conv.i.v
0000011C: push.imm.e 0
00000120: conv.i.v
00000124: push.imm.e 245
00000128: conv.i.v
0000012C: call action_create_object(argc=3)
00000134: popz
00000138: push.imm.e 0
0000013C: conv.i.v
00000140: push.imm.e 0
00000144: conv.i.v
00000148: push.imm.e 450
0000014C: conv.i.v
00000150: call action_create_object(argc=3)
00000158: popz
0000015C: call action_kill_object(argc=0)
00000164: popz
00000168: push.imm.e 0
0000016C: conv.i.v
00000170: push.imm.e 0
00000174: conv.i.v
00000178: push.imm.e 127
0000017C: conv.i.v
00000180: call action_if_number(argc=3)
00000188: pop.v.v local.__b__
00000190: push.local.v local.__b__
00000198: conv.v.b
0000019C: bf 0x20EC5F4
000001A0: push.imm.e 0
000001A4: conv.i.v
000001A8: push.imm.e 1
000001AC: conv.i.v
000001B0: push.v redder
000001B8: call action_if_variable(argc=3)
000001C0: pop.v.v local.__b__
000001C8: push.local.v local.__b__
000001D0: conv.v.b
000001D4: bf 0x20EC5F4
000001D8: push.imm.e 455
000001DC: pushenv 0x20EC424
000001E0: push.imm.e 0
000001E4: conv.i.v
000001E8: push.imm.e 1
000001EC: conv.i.v
000001F0: push.v night
000001F8: call action_if_variable(argc=3)
00000200: pop.v.v local.__b__
00000208: push.local.v local.__b__
00000210: conv.v.b
00000214: bf 0x20EC424
00000218: b 0x20EC42C
0000021C: popenv 0x40EC3E8
00000220: b 0x20EC430
00000224: popenv 0x1CEC42C
00000228: push.local.v local.__b__
00000230: conv.v.b
00000234: bf 0x20EC460
00000238: push.imm.e 1
0000023C: conv.i.v
00000240: push.i 16366009
00000248: conv.i.v
0000024C: call action_sprite_color(argc=2)
00000254: popz
00000258: push.imm.e 455
0000025C: pushenv 0x20EC4A4
00000260: push.imm.e 0
00000264: conv.i.v
00000268: push.imm.e 1
0000026C: conv.i.v
00000270: push.v dawn
00000278: call action_if_variable(argc=3)
00000280: pop.v.v local.__b__
00000288: push.local.v local.__b__
00000290: conv.v.b
00000294: bf 0x20EC4A4
00000298: b 0x20EC4AC
0000029C: popenv 0x40EC468
000002A0: b 0x20EC4B0
000002A4: popenv 0x1CEC4AC
000002A8: push.local.v local.__b__
000002B0: conv.v.b
000002B4: bf 0x20EC4E0
000002B8: push.imm.e 1
000002BC: conv.i.v
000002C0: push.i 15201023
000002C8: conv.i.v
000002CC: call action_sprite_color(argc=2)
000002D4: popz
000002D8: push.imm.e 455
000002DC: pushenv 0x20EC524
000002E0: push.imm.e 0
000002E4: conv.i.v
000002E8: push.imm.e 0
000002EC: conv.i.v
000002F0: push.v dawn
000002F8: call action_if_variable(argc=3)
00000300: pop.v.v local.__b__
00000308: push.local.v local.__b__
00000310: conv.v.b
00000314: bf 0x20EC524
00000318: b 0x20EC52C
0000031C: popenv 0x40EC4E8
00000320: b 0x20EC530
00000324: popenv 0x1CEC52C
00000328: push.local.v local.__b__
00000330: conv.v.b
00000334: bf 0x20EC5C0
00000338: push.imm.e 455
0000033C: pushenv 0x20EC584
00000340: push.imm.e 0
00000344: conv.i.v
00000348: push.imm.e 0
0000034C: conv.i.v
00000350: push.v night
00000358: call action_if_variable(argc=3)
00000360: pop.v.v local.__b__
00000368: push.local.v local.__b__
00000370: conv.v.b
00000374: bf 0x20EC584
00000378: b 0x20EC58C
0000037C: popenv 0x40EC548
00000380: b 0x20EC590
00000384: popenv 0x1CEC58C
00000388: push.local.v local.__b__
00000390: conv.v.b
00000394: bf 0x20EC5C0
00000398: push.imm.e 1
0000039C: conv.i.v
000003A0: push.i 16777215
000003A8: conv.i.v
000003AC: call action_sprite_color(argc=2)
000003B4: popz
000003B8: push.imm.e 0
000003BC: conv.i.v
000003C0: call action_set_relative(argc=1)
000003C8: popz
000003CC: push.imm.e 0
000003D0: pop.v.i redder
000003D8: push.imm.e 1
000003DC: conv.i.v
000003E0: call action_set_relative(argc=1)
000003E8: popz
000003EC: push.imm.e 0
000003F0: conv.i.v
000003F4: push.imm.e 1
000003F8: conv.i.v
000003FC: push.imm.e 127
00000400: conv.i.v
00000404: call action_if_number(argc=3)
0000040C: pop.v.v local.__b__
00000414: push.local.v local.__b__
0000041C: conv.v.b
00000420: bf 0x20EC680
00000424: push.imm.e 0
00000428: conv.i.v
0000042C: push.imm.e 1
00000430: conv.i.v
00000434: push.v redder
0000043C: call action_if_variable(argc=3)
00000444: pop.v.v local.__b__
0000044C: push.local.v local.__b__
00000454: conv.v.b
00000458: bf 0x20EC680
0000045C: push.imm.e 1
00000460: conv.i.v
00000464: push.imm.e 255
00000468: conv.i.v
0000046C: call action_sprite_color(argc=2)
00000474: popz
00000478: push.imm.e 0
0000047C: conv.i.v
00000480: call action_set_relative(argc=1)
00000488: popz